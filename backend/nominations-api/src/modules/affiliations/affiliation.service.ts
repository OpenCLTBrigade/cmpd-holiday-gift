import { Injectable } from '@nestjs/common';
import { Affiliation, ApplicationError, createPagedResults, logger } from 'cmpd-common-api';
import { getRepository, Brackets } from 'typeorm';

export enum ErrorCodes {
  NoAffiliationExists = 'NoAffiliationExists'
}

@Injectable()
export class AffiliationService {
  async query({ type = '', search = '', page = 1, sizePerPage = 50, whitelist = [], baseUrl = '' } = {}) {
    try {
      let sqlQuery = Affiliation.createQueryBuilder('affiliation');

      if (search) {
        sqlQuery = sqlQuery.andWhere(searchExpression(search));
      }

      if (page) {
        sqlQuery = await sqlQuery.skip((page - 1) * sizePerPage).take(sizePerPage);
      }

      const totalSize = await sqlQuery.getCount();
      const results = await sqlQuery.printSql().getMany();

      return {
        items: results,
        page,
        baseUrl,
        totalSize,
        per_page: results.length
      };
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

const searchExpression = (search: string) =>
  new Brackets(qb => {
    qb.where('affiliation.name like :name', { name: '%' + search + '%' });
  });
