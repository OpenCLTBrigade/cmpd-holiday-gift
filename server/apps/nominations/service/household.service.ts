import { BadRequestException } from "@nestjs/common";
import Household from '../../../entities/household';
import Attachment from '../../../entities/attachment';
import Address from '../../../entities/address';
import Child from '../../../entities/child';
import PhoneNumber from '../../../entities/phone-number';

const path = require('path');

import logger from "../../lib/logger";
import { createPagedResults } from "../../lib/table/table";
import { CreateHouseholdDto } from '../controllers/dto/create-household.dto';
import { UpdateHouseholdDto } from '../controllers/dto/update-household.dto';
const sendMail = require('../../lib/mail')(path.join(__dirname, '../../nominations/mail-templates'));


export async function query({
    page,
    search,
    active = true,
    nominator = undefined,
    baseUrl = '',
    whitelist = []
  }) {
    try {
      const query = search && {
        keys: [
            'name_last',
            'nominator.name_last'
          ],
        search
      };
  
      let results = await Household.find();
      return createPagedResults({
        results,
        page,
        query,
        baseUrl,
        fieldWhitelist: whitelist
      });
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  export async function getById(id: number) {
    return await Household.findOneById(id, { relations: ['nominator', 'phoneNumbers', 'children', 'address']})
  }

  export async function submitNomination(id) {
    const household = await Household.findOneById(id, { relations: ['children']});

    if (household.children.length === 0) {
      throw new BadRequestException();
    }

    household.draft = false;

    await household.save();
  }

  export async function submitFeedback({id, approved, reason, message}) {
    logger.info('saving feedback');

    const household = await Household.findOneById(id);

    household.reviewed = true;
    household.approved = approved;
    household.reason = reason;

    await household.save();

    try {
      logger.info('sending feedback email');

      //TODO: Should probably be an event fired here and handled elsewhere
      if (approved) {
        await sendMail('feedback-approved', { to: household.nominator.email, name_last: household.lastName });
      } else {
        await sendMail('feedback-declined', {
          to: household.nominator.email,
          feedbackText: message,
          reason,
          name_last: household.lastName
        });
      }
    } catch (error) {
      logger.error('failed to send submission feedback email');
    }
  }

  export async function updateHousehold(id, updateHouseholdDto: UpdateHouseholdDto) {
    logger.info('updateHousehold');

    const household = await Household.findOneById(id);

    household.firstName = updateHouseholdDto.firstName;
    household.lastName = updateHouseholdDto.lastName;
    household.middleName = updateHouseholdDto.middleName || '';
    household.dob = updateHouseholdDto.dob;
    household.race = updateHouseholdDto.race;
    household.gender = updateHouseholdDto.gender;
    household.last4ssn = updateHouseholdDto.last4ssn;
    household.email = updateHouseholdDto.email;
    household.preferredContactMethod = updateHouseholdDto.preferredContactMethod;

    const children = await Child.find({where: { householdId: id }})
    const phoneNumbers = await PhoneNumber.find({where: { householdId: id }})

    const newChildren = updateHouseholdDto.children.filter(row => !row.id);
    const newPhones = updateHouseholdDto.phoneNumbers.filter(row => !row.id);

    const updatedChildren = updateHouseholdDto.children.filter(row => !!row.id);
    const updatedPhones = updateHouseholdDto.phoneNumbers.filter(row => !!row.id);

    const updatedChildIds = updatedChildren.map(row => row.id);
    const updatedPhoneIds = updatedPhones.map(row => row.id);

    const deletedChildIds = children.filter(child => !updatedChildIds.includes(child.id)).map(row => row.id);
    const deletedPhoneIds = phoneNumbers.filter(number => !updatedPhoneIds.includes(number.id)).map(row => row.id)

    await Child.updateById(deletedChildIds, {deleted: true})
    await PhoneNumber.updateById(deletedPhoneIds, {deleted: true})

    newChildren.forEach(async (child) => {
      const entity = Child.fromJSON(child);
      entity.household = household;
      await entity.save();
    })

    newPhones.forEach(async number => {
      const entity = PhoneNumber.fromJSON(number)

      entity.household = household;
      await entity.save();
    });

    return await getById(id);
  }

  export async function createHousehold(createHouseholdDto: CreateHouseholdDto, { id: nominatorId}) {
    logger.info('createHousehold');

    const household = Household.fromJSON({nominatorId, ...createHouseholdDto});

    const created = await household.save();

    createHouseholdDto.children.forEach(async (child) => {
      const entity = Child.fromJSON(child);
      entity.household = created;
      await entity.save();
    })
    createHouseholdDto.phoneNumbers.forEach(async number => {
      const entity = PhoneNumber.fromJSON(number)

      entity.household = created;
      await entity.save();
    });

    const address = Address.fromJSON(createHouseholdDto.address);
    address.household = created;

    await address.save();
    
    return await getById(created.id);
  }

  export async function removeHousehold(id) {
    logger.info('removeHousehold');

    const household = await Household.findOneById(id);

    household.deleted = true;
    household.deletedAt = new Date();

    return await household.save();
  }

  export async function addAttachment({householdId, path}) {
    const attachment = Attachment.fromJSON({householdId, path});

    return await attachment.save();
  }