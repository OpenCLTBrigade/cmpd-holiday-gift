// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');
const sequelize = require('sequelize');

const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }];

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';
import type { TableRequest } from '../../lib/tableApi';

type ListRequest = {
    ...TableRequest,
    search: string
}
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
    try {
      household = await db.household.findById(req.params.id, { include: related });
      if (!household) {
        throw new Error('Household not found');
      }
    } catch (err) {
      household = null;
      res.status(404);
    }
        // var schools = await db.affiliation.findAll({
        //   attributes: ['id', 'name'],
        //   where: { type: 'cms' }
        // });
    res.json(household);
  },

  async submitNomination(req: any, res: any): Promise<void> {
    console.log('submitting nominations');
    const { id } = req.body;

    let household = undefined;

    try {
      console.log('searching for nomination');
      household = await db.household.findById(id);
      if (!household) {
        throw new Error('Household not found');
      }

      console.log(household);

      household.draft = false;
      household.save().then(() => res.sendStatus(200));
    } catch (err) {
      res.sendStatus(404);
    }
  },

  createHousehold: async (req: any, res: any): Promise<void> => {
        // TODO: Check if user has reached nomination limit and reject if so
        // TODO: Validation?

    // const { id } = req.user;
    // const nomination_count = await db.household.count({ where: { 'nominator_id': id } });
    // console.log(user);
    let id = undefined;

    return db.sequelize
            .transaction(async t => {
              const { household, address, phoneNumbers, nominations } = req.body;
              const nominator = Object.assign({}, req.user);

              console.log('creating household');
                // Create household record
              const newHousehold = await db.household.create({
                name_first: household.firstName,
                name_last: household.lastName,
                dob: household.dob,
                race: household.ethnicity,
                gender: household.gender,
                email: household.email,
                last4ssn: household.ssn,
                preferred_contact_method: household.contactMethod,
                draft: true,
                nomination_email_sent: false,
                reviewed: false,
                approved: false,
                nominator_user_id: nominator.id
              });

              console.log('creating household_address');

                // Create address record (from address{})
              db.household_address.create({
                street: address.addressLine1,
                street2: address.addressLine2 || '',
                city: address.city,
                state: address.state,
                zip: address.zip,
                cmpd_division: address.cmpd_division,
                cmpd_response_area: address.cmpd_response_area,
                type: address.deliveryAddressType || '',
                household_id: newHousehold.id
              });

              for (const phone of phoneNumbers) {
                console.log('creating household_phone');
                db.household_phone.create({
                  number: phone.number,
                  type: phone.type,
                  household_id: newHousehold.id
                });
              }

                // Create child records (from nominations[])
              for (const child of nominations) {
                console.log('creating child');

                db.child.create({
                  name_first: child.firstName,
                  name_last: child.lastName,
                  dob: child.dob,
                  additional_ideas: child.additionalIdeas || '',
                  bike_want: child.wantsBike || false,
                  bike_size: child.bikeSize || null,
                  bike_style: child.bikeStyle || null,
                  clothes_want: child.wantsClothes || false,
                  clothes_size_shirt: child.shirtSize || null,
                  clothes_size_pants: child.pantSize || null,
                  shoe_size: child.shoeSize || null,
                  race: child.ethnicity,
                  favourite_colour: child.favoriteColor || null,
                  gender: child.gender,
                  interests: child.interests || '',
                  reason_for_nomination: child.nominationReason || '',
                  free_or_reduced_lunch: child.receivesLunch,
                  school_id: child.schoolName,
                  last4ssn: child.ssn,
                  household_id: newHousehold.id
                });

                id = newHousehold.id;
              }
            })
            .then(() => {
              res.json({ id });
                // Success. Committed.
            })
            .catch(error => {
                // Error. Rolled back.
              console.log(error);
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
