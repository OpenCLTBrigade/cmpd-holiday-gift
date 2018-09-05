import { Injectable } from '@nestjs/common';
import { Affiliation, ApplicationError, createPagedResults, logger } from 'cmpd-common-api';
import { getRepository } from 'typeorm';

export enum ErrorCodes {
  NoAffiliationExists = 'NoAffiliationExists'
}

@Injectable()
export class AffiliationService {
  async query({ type = '', search = '', page = 1, whitelist = [] } = {}) {
    try {
      const query = search && {
        keys: ['name'],
        search
      };

      let results = await getRepository(Affiliation).find({ where: type && { type } });

      return results;
    } catch (error) {
      logger.error(error);
      throw new ApplicationError(error.message);
    }
  }

  async getAffiliation(id) {
    try {
      let affiliation = await getRepository(Affiliation).findOneById(id);

      return affiliation;
    } catch (error) {
      logger.error(error);
      throw new ApplicationError(error.message);
    }
  }
}
