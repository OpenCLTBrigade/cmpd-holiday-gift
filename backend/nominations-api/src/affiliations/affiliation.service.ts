import { ApplicationError } from '../common/util/application-error';
import { getRepository } from 'typeorm';
import { Component } from '@nestjs/common';

import { Affiliation, logger, createPagedResults } from 'cmpd-common-api';

export enum ErrorCodes {
  NoAffiliationExists = 'NoAffiliationExists'
}

@Component()
export class AffiliationService {
  async query({ type = '', search = '', page = 1, whitelist = [] } = {}) {
    try {
      const query = search && {
        keys: ['name'],
        search
      };

      let results = await getRepository(Affiliation).find({ where: type && { type } });

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
