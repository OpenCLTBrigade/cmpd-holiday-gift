// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const logger = require('../../lib/logger');

const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }];
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');
const { createAttachment, createMainBucket, getAttachmentUrl, getAttachments } = require('../../lib/attachment');
const bucketName = 'cfc-cmpd-explorers-qa';
const sendMail = require('../../lib/mail')(path.join(__dirname, '../../nominations/mail-templates'));

// const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }, { model: db.household_address, as: 'address' }];

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';
import type { TableRequest } from '../../lib/tableApi';

type ListRequest = {
    ...TableRequest,
    search: string
}

const childDefaults = {
  additional_ideas: '',
  bike_want: false,
  bike_size: null,
  bike_style: null,
  clothes_want: false,
  clothes_size_shirt: null,
  clothes_size_pants: null,
  shoe_size: null,
  favourite_colour: null,
  interests: '',
  reason_for_nomination: ''
};

const householdDefaults = {
  draft: true,
  nomination_email_sent: false,
  reviewed: false,
  approved: false
};

module.exports = {
  list: async (req: UserRequest<>, res: Response): Promise<void> => {
    const query: ListRequest = (req.query: any);
    const api = new TableApi(req, query);
    try {
      let whereClause = {};
      if (query.search) {
        whereClause = { name_last: { $like: `${query.search}%` } };
      }
      const result = await api.fetchAndParse(db.household, whereClause, related, { method: ['filteredByUser', req.user] });
      res.json(result);
    } catch (err) {
            // TODO: properly log error
      console.error(err);
      res.json({ error: 'error fetching data' });
    }
  },

  getHousehold: async (req: UserRequest<AnyRole, { id: string }>, res: Response): Promise<void> => {
    let household = null;
    let address = null;
    let phoneNumbers = [];

    try {
      const entity = await db.household.findById(req.params.id, { include: related });
      const addressEntity = await db.household_address.find({ where: { household_id: req.params.id } });
      phoneNumbers = await db.household_phone.findAll({ where: { household_id: req.params.id } });
      household = entity.dataValues;
      address = addressEntity.dataValues;

      if (!household) {
        throw new Error('Household not found');
      }
    } catch (err) {
      household = null;
      res.status(404);
    }

    try {
      if (household != null) {
        const owner = `household-${household.id}`;
        const attachments = await getAttachments({ name: bucketName, owner });

        household.attachments = attachments;
      }
    } catch (error) {
      logger.error(error);
    }

    res.json(Object.assign({}, household, { address, phoneNumbers }));
  },

  async getAttachments(req: any, res: any) {
    logger.info('getting attachments');
    const { id } = req.params;
    const owner = `household-${id}`;

    try {
      const attachments = await getAttachments({ name: bucketName, owner });

      res.json(attachments);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }
  },

  async createAttachments(req: any, res: any) {
    const nominator = Object.assign({}, req.user.dataValues);
    const { id } = req.params;
    const files = [];
    const owner = `household-${id}`;

    const uploadDir = path.join(process.cwd(), 'uploads');

    logger.info('uploading document for user', nominator.id);

    try {
      await createMainBucket(bucketName);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }

        // create an incoming form object
    const form = new formidable.IncomingForm();

    form.multiples = true;
    form.uploadDir = uploadDir;

    form.on('file', function (field, file) {
      files.push({ filename: file.name, path: file.path });
      logger.info('uploading to s3', { filename: file.name });
    });

        // log any errors that occur
    form.on('error', function (err) {
      console.log('An error has occured: \n' + err);
    });

        // once all the files have been uploaded, send a response to the client
    form.on('end', async function () {
      try {
        const fileResults = [];
        for (const file of files) {
          const { filename } = file;
          const fileBuffer = await fs.readFile(file.path);
          await createAttachment({ name: bucketName, filename: `${owner}/${filename}`, fileBuffer });

          logger.info('uploaded to s3', { filename });

          await db.household_attachment.create({ household_id: id, path: filename });
          await fs.remove(file.path);
          const url = await getAttachmentUrl({ name: bucketName, filename: `${owner}/${filename}` });
          fileResults.push({ url, filename });
        }

        res.json(fileResults);
      } catch (error) {
        logger.error(error);
        res.sendStatus(500);
      }
    });

        // parse the incoming request containing the form data
    form.parse(req);
  },

  async submitNomination(req: any, res: any): Promise<void> {
    logger.info('submitting nominations');
    const { id } = req.body;

    let household = undefined;

    try {
      logger.info('searching for nomination');
      household = await db.household.findById(id);
      if (!household) {
        throw new Error('Household not found');
      }

      household.draft = false;
      household.save().then(() => res.sendStatus(200));
    } catch (err) {
      res.sendStatus(404);
    }
  },

  async submitFeedback(req: any, res: any){
    const { approved, reason, message } = req.body;
    try {
      logger.info(`Submitting feedback for ${req.params.id}`);
      const household = await db.household.findById(req.params.id, { include: [{ model: db.user, as: 'nominator' }] });
      if (!household) {
        throw new Error('Household not found');
      }
  
      // Message is not stored; it gets emailed
      household.reviewed = true;
      household.approved = approved;
      household.reason = reason || '';
  
      await household.save();
  
      if (approved) {
        await sendMail('feedback-approved', { to: household.nominator.email, name_last: household.name_last });
      } else {
        await sendMail('feedback-declined', { to: household.nominator.email, feedbackText: message, reason, name_last: household.name_last });
      }
  
      res.json({ data: true });
    } catch (err) {
      logger.info('feedback submission failed.', 'approved', approved, 'reason', reason, 'message', message, 'error', err);
      res.json({ data: false });
    }
  },

  async updateHousehold(req, res): Promise<void> {
    logger.info('updateHousehold');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { id } = req.params;

    return db.sequelize
            .transaction(async t => {
              const payload = matchedData(req);

              try {
                logger.info('finding household', id);
                const household = await db.household.findById(id);
                const address = await db.household_address.find({ where: { household_id: id } });

                logger.info('updating household', id);

                household.update(Object.assign({}, payload.household));

                logger.info('updating address', id);

                address.update(Object.assign({}, payload.address));

                const numbers = await db.household_phone.findAll({ where: { household_id: id } });

                const removedNumbers =
                        numbers &&
                        numbers.filter(
                            entity =>
                                payload.phoneNumbers &&
                                payload.phoneNumbers.every(json => json.number !== entity.dataValues.number)
                        );
                const addedNumbers = (payload.phoneNumbers &&
                        payload.phoneNumbers.filter(
                            json => numbers && numbers.every(entity => json.number !== entity.dataValues.number)
                        )) || [];
                const updatedNumbers = (payload.phoneNumbers &&
                        payload.phoneNumbers.filter(
                            json => numbers && numbers.some(entity => json.number === entity.dataValues.number)
                        )) || [];

                for (const removed of removedNumbers) {
                  logger.info('removing number');

                  removed.destroy();
                }

                for (const added of addedNumbers) {
                  logger.info('adding number');

                  db.household_phone.create(Object.assign({}, added, { household_id: id }));
                }

                for (const updated of updatedNumbers) {
                  logger.info('updating number');

                  const toUpdate = numbers.find(number => updated.number === number.number);
                  toUpdate.update(updated);
                }

                const nominations = await db.child.findAll({ where: { household_id: id } });

                const removedNominations =
                        nominations &&
                        nominations.filter(
                            entity =>
                                payload.nominations &&
                                payload.nominations.every(json => json.last4ssn !== entity.last4ssn)
                        );
                const addedNominations = (payload.nominations &&
                        payload.nominations.filter(
                            json =>
                                nominations && nominations.every(entity => json.last4ssn !== entity.dataValues.last4ssn)
                        )) || [];
                const updatedNominations = (payload.nominations &&
                        payload.nominations.filter(
                            json =>
                                nominations && nominations.some(entity => json.last4ssn === entity.dataValues.last4ssn)
                        )) || [];

                for (const removed of removedNominations) {
                  logger.info('removing nomination');

                  removed.destroy();
                }

                for (const added of addedNominations) {
                  logger.info('adding nomination');

                  db.child.create(Object.assign({}, added, childDefaults, { household_id: id }));
                }

                for (const updated of updatedNominations) {
                  logger.info('updating nomination');

                  const toUpdate = nominations.find(nomination => nomination.last4ssn === updated.last4ssn);
                  toUpdate.update(updated);
                }
              } catch (error) {
                logger.info(error);
              }
            })
            .then(() => res.sendStatus(200));
  },

  async getLimitStatus(req: any, res: any) {
    const nominator = Object.assign({}, req.user);
    const { nomination_limit: limit } = nominator.dataValues;
    const count = await db.household.count({ where: { nominator_id: nominator.id } });

    return res.json({ count, limit });
  },

  createHousehold: async (req: any, res: any): Promise<void> => {
        // TODO: Check if user has reached nomination limit and reject if so

    const nominator = Object.assign({}, req.user);
    const { nomination_limit } = nominator.dataValues;
    const count = await db.household.count({ where: { nominator_id: nominator.id } });

    if (nomination_limit === count) {
      return res.sendStatus(403);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    return db.sequelize
            .transaction(async t => {
              try {
                const { household, address, phoneNumbers, nominations } = req.body;

                logger.info('creating household');
                                // Create household record
                const newHousehold = await db.household.create(
                                    Object.assign({}, householdDefaults, household, { nominator_id: nominator.id })
                                );
                const { id } = newHousehold;

                logger.info('created household', { id });
                logger.info('creating household_address');

                                // Create address record (from address{})
                const newAddress = await db.household_address.create({
                  street: address.street,
                  street2: address.street2 || '',
                  city: address.city,
                  state: address.state,
                  zip: address.zip,
                  cmpd_division: address.cmpd_division,
                  cmpd_response_area: address.cmpd_response_area,
                  type: address.type || '',
                  household_id: id
                });

                logger.info('created household_address', { id: newAddress.id });


                for (const phone of phoneNumbers) {
                  logger.info('creating household_phone');
                  const newPhone = await db.household_phone.create({
                    number: phone.number,
                    type: phone.type,
                    household_id: id
                  });

                  logger.info('created household_phone', { id: newPhone.id });
                }

                                // Create child records (from nominations[])
                for (const child of nominations) {
                  logger.info('creating child');

                  const newChild = await db.child.create(Object.assign({}, childDefaults, child, { household_id: id }));

                  logger.info('created child', { id: newChild.id });

                }

                return id;
              } catch (error) {
                logger.error(error);
              }

            })
            .then(id => {
              res.json({ id });
                // Success. Committed.
            })
            .catch(error => {
                // Error. Rolled back.
              logger.error(error);
              res.sendStatus(500);
            });
  }

    // async function register(req: Request<>, res: Response): Promise<void> {
    //   const body: RegisterRequest = (req.body: any);
    //   const error = await registration.steps.register(rootUrl(req), {
    //     name_first: body.firstname,
    //     name_last: body.lastname,
    //     rank: body.rank,
    //     phone: body.phone,
    //     affiliation_id: body.affiliation,
    //     email: body.email,
    //     raw_password: body.password
    //   });
    //   if (error) {
    //     res.json(error);
    //   } else {
    //     res.json({ success: true });
    //   }
    // }
};
