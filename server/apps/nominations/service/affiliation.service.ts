import { ApplicationError } from '../../../common/util/application-error';
import { getRepository } from 'typeorm';
import { Component } from '@nestjs/common';

import Affiliation from '../../../entities/affiliation';

import logger from '../../lib/logger';
import { createPagedResults } from '../../lib/table/table';

export enum ErrorCodes {
  NoAffiliationExists = 'NoAffiliationExists'
}

@Component()
export class AffiliationService {
  async query({ page, search, whitelist = [] }) {
    try {
      const query = search && {
        keys: ['name'],
        search
      };

      let results = await getRepository(Affiliation).find();

      return createPagedResults({
        results,
        page,
        query,
        baseUrl: '',
        fieldWhitelist: whitelist
      });
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
