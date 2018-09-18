import { Injectable } from '@nestjs/common';
import { Nominator } from 'cmpd-common-api';
import { isNil } from 'rambda';
import logger from '../lib/logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Brackets } from 'typeorm';

// TODO: Criteria that determines whether or not a user account is pending approval
const Criteria = {
  PENDING: { emailVerified: false, disabled: true },
  LIVE: { disabled: false }
};

export enum ErrorCodes {
  NoUserExists = 'NoUserExists'
}

const determineSearchQuery = search =>
  isNil(search)
    ? undefined
    : {
        keys: ['lastName', 'firstName'],
        search
      };

@Injectable()
export class UserService {
  async query({ page, search, baseUrl = '', whitelist = [], query = { affiliationId: undefined } }) {
    try {
      const searchQuery = determineSearchQuery(search);

      let sqlQuery = Nominator.createQueryBuilder('user')
        .leftJoinAndSelect('user.affiliation', 'affiliation')
        .leftJoinAndSelect('user.households', 'households');

      if (query.affiliationId) {
        sqlQuery = sqlQuery.where('user.affiliation_id = :affiliation_id', {
          affiliation_id: query.affiliationId
        });
      } else {
        // TODO: why search only live users?
        sqlQuery = sqlQuery.where('user.disabled = :disabled', { disabled: Criteria.LIVE.disabled });
      }

      if (search) {
        sqlQuery = sqlQuery.andWhere(searchExpression(search));
      }

      const results = await sqlQuery.getMany();
      const totalSize = await sqlQuery.getCount();

      //TODO: Revisit if we need paging
      return {
        items: results,
        page,
        baseUrl,
        totalSize,
        per_page: results.length
      };
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getPendingUsers({ page, search, baseUrl = '', whitelist = [] }) {
    try {
      let sqlQuery = Nominator.createQueryBuilder('user').leftJoinAndSelect('user.affiliation', 'affiliation');

      sqlQuery = sqlQuery
        .where('user.disabled = :disabled', {
          disabled: Criteria.PENDING.disabled
        })
        .orWhere('user.email_verified = :email_verified', {
          email_verified: Criteria.PENDING.emailVerified
        });

      if (search) {
        sqlQuery = sqlQuery.andWhere(searchExpression(search));
      }

      const totalSize = await sqlQuery.getCount();

      const results = await sqlQuery
        .skip((page - 1) * 10)
        .take(10)
        .printSql()

        .getMany();

      return {
        items: results,
        page,
        baseUrl,
        totalSize,
        per_page: results.length
      };
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getById(id) {
    return await Nominator.findOneById(id, {
      relations: ['households', 'affiliation']
    });
  }

  async update({ uid, ...rest }: UpdateUserDto, currentUser) {
    logger.warn('this function was deprecated and moved to the auth module');
  }

  async create(createUserDto: CreateUserDto) {
    logger.warn('this function was deprecated and moved to the auth module');
  }

  async approve(id) {
    logger.warn('this function was deprecated and moved to the auth module');
  }

  async decline(id) {
    logger.warn('this function was deprecated and moved to the auth module');
  }
}

const searchExpression = (search: string) =>
  new Brackets(qb => {
    qb.where('user.name like :name', { name: '%' + search + '%' });
  });
