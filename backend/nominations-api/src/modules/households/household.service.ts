import { ApplicationError } from '../../common/util/application-error';
import { Component } from '@nestjs/common';

import { Household, Attachment, Address, Child, PhoneNumber } from 'cmpd-common-api';

const path = require('path');

import logger, { logStart, logEnd } from '../../common/util/logger';
import { createPagedResults } from '../lib/table/table';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';

const sendMail = require('../lib/mail')(path.join(__dirname, './mail-templates'));

export enum ErrorCodes {
  NoChildrenExists = 'NoChildrenExists',
  NoHouseholdExists = 'NoHouseholdExists'
}

@Component()
export class HouseholdService {
  async getAll({ active = true } = {}) {
    return await Household.find({ where: active && { deleted: false } });
  }
  async query({ page, search = undefined, active = true, nominator = undefined, baseUrl = '', whitelist = [] }) {
    try {
      const query = search && {
        keys: ['lastName', 'nominator.lastName'],
        search
      };

      let results = await Household.find({ where: active && { deleted: false } });
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

  async getById(id: number) {
    return await Household.findOneById(id, {
      relations: ['nominator', 'phoneNumbers', 'children', 'address']
    });
  }

  async submitNomination(id) {
    const household = await Household.findOneById(id, {
      relations: ['children']
    });

    if (household.children.length === 0) {
      throw new ApplicationError('Must add children to this household', ErrorCodes.NoChildrenExists);
    }

    household.draft = false;

    await household.save();
  }

  async submitFeedback({ id, approved, reason, message }) {
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
        await sendMail('feedback-approved', {
          to: household.nominator.email,
          name_last: household.lastName
        });
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

  async updateHousehold(
    id,
    {
      household: householdDto,
      address: addressDto,
      phoneNumbers: phoneNumbersDto,
      children: childrenDto
    }: UpdateHouseholdDto
  ) {
    logStart('updateHousehold');

    logStart('saving household');

    const household = await Household.findOneById(id);

    household.firstName = householdDto.firstName;
    household.lastName = householdDto.lastName;
    household.dob = householdDto.dob;
    household.race = householdDto.race;
    household.gender = householdDto.gender;
    household.last4ssn = householdDto.last4ssn;
    household.email = householdDto.email;
    household.preferredContactMethod = householdDto.preferredContactMethod;

    await household.save();

    logEnd('saving household');

    logStart('saving children');

    await this.updateChildren(household, childrenDto);

    logEnd('saving children');

    logStart('phone numbers');

    await this.updatePhoneNumbers(household, phoneNumbersDto);

    logEnd('phone numbers');

    const address = (await Address.findOne({ where: { householdId: id } })) || Address.create();
    await Address.merge(address, addressDto, { householdId: id }).save();

    logEnd('updateHousehold');

    return await this.getById(id);
  }

  private async updatePhoneNumbers(household: Household, phoneNumbersDto) {
    logStart('updatePhoneNumbers');

    const { id: householdId } = household;
    const phoneNumbers = await PhoneNumber.find({ where: { householdId } });

    const updatedPhoneIds = phoneNumbersDto.map(row => row.number);
    const deletedPhoneIds = phoneNumbers.filter(number => !updatedPhoneIds.includes(number.number)).map(row => row.id);

    logStart('deleting numbers');

    await PhoneNumber.updateById(deletedPhoneIds, { deleted: true });

    logEnd('deleting numbers');

    logStart('updating numbers');

    phoneNumbersDto.forEach(async ({ number, type }) => {
      const entity = phoneNumbers.find(phoneNumber => phoneNumber.number === number);

      if (entity) {
        entity.number = number;
        entity.type = type;

        await entity.save();
      } else {
        const entity = PhoneNumber.fromJSON({ number, type });
        entity.householdId = household.id;
        await entity.save();
      }
    });

    logEnd('updating numbers');

    logEnd('updatePhoneNumbers');
  }

  private async updateChildren(household: Household, childrenDto) {
    logStart('updateChildren');

    const { id: householdId } = household;
    const children = await Child.find({ where: { householdId } });

    const updatedChildIds = childrenDto.map(row => row.last4ssn);
    const deletedChildIds = children.filter(child => !updatedChildIds.includes(child.last4ssn)).map(row => row.id);

    logStart('deleting children', deletedChildIds);

    await Child.updateById(deletedChildIds, { deleted: true });

    logStart('updating children');

    childrenDto.forEach(async ({ ...rest }) => {
      const entity = children.find(child => child.last4ssn === rest.last4ssn);

      if (entity) {
        entity.additionalIdeas = rest.additionalIdeas;
        entity.bikeSize = rest.bikeSize;
        entity.bikeStyle = rest.bikeStyle;
        entity.clothesCoatSize = rest.clothesCoatSize;
        entity.clothesPantsSize = rest.clothesPantsSize;
        entity.clothesShirtSize = rest.clothesShirtSize;
        entity.dob = rest.dob;
        entity.favouriteColor = rest.favouriteColor;
        entity.firstName = rest.firstName;
        entity.freeOrReducedLunch = rest.freeOrReducedLunch;
        entity.gender = rest.gender;
        entity.interests = rest.interests;
        entity.last4ssn = rest.last4ssn;
        entity.lastName = rest.lastName;
        entity.race = rest.race;
        entity.reasonForNomination = rest.reasonForNomination;
        entity.schoolId = rest.schoolId;
        entity.shoeSize = rest.shoeSize;
        entity.wantsClothes = rest.wantsClothes;

        await entity.save();
      } else {
        const entity = Child.fromJSON(rest);
        entity.household = household;
        await entity.save();
      }
    });

    logEnd('updateChildren');
  }

  async createHousehold(
    { household: householdProps, address: addressProps, phoneNumbers, children }: CreateHouseholdDto,
    { id: nominatorId }
  ) {
    logger.info('Start...', 'createHousehold');

    const household = Household.fromJSON({
      nominatorId,
      ...householdProps
    });

    logStart('saving household');

    const created = await household.save();

    logEnd('saving household', created.id);

    logStart('saving children');

    children.forEach(async child => {
      const entity = Child.fromJSON(child);
      entity.household = created;
      await entity.save();
    });

    logEnd('saving children');

    logStart('saving phone numbers');

    phoneNumbers.forEach(async number => {
      const entity = PhoneNumber.fromJSON(number);

      entity.household = created;
      await entity.save();
    });

    logEnd('saving phone numbers');

    logStart('saving address');

    const address = Address.fromJSON(addressProps);
    address.household = created;

    await address.save();

    logEnd('saving address');

    return await this.getById(created.id);
  }

  async removeHousehold(id) {
    logger.info('removeHousehold');

    const household = await Household.findOneById(id);

    household.deleted = true;
    household.deletedAt = new Date();

    return await household.save();
  }

  async addAttachment({ householdId, path }) {
    const attachment = Attachment.fromJSON({ householdId, path });

    return await attachment.save();
  }
}
