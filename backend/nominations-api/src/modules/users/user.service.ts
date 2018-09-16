import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Nominator } from 'cmpd-common-api';
import { isNil } from 'rambda';
import { ApplicationError } from '../../common/util/application-error';
import auth from '../lib/auth';
import logger from '../lib/logger';
import { createPagedResults } from '../lib/table/table';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import admin from '../../common/services/firebase';

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

      const results = await sqlQuery.getMany();

      //TODO: Revisit if we need paging
      return {
        items: results,
        page,
        baseUrl,
        totalSize: results.length,
        per_page: results.length
      };
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getPendingUsers({ page, search, baseUrl = '', whitelist = [] }) {
    try {
      const searchQuery = search && {
        keys: ['lastName', 'firstName'],
        search
      };

      let sqlQuery = Nominator.createQueryBuilder('user').leftJoinAndSelect('user.affiliation', 'affiliation');

      sqlQuery = sqlQuery
        .where('user.disabled = :disabled', {
          disabled: Criteria.PENDING.disabled
        })
        .orWhere('user.email_verified = :email_verified', {
          email_verified: Criteria.PENDING.emailVerified
        })
        .skip((page - 1) * 10)
        .take(10);

      const results = await sqlQuery.getMany();

      return {
        items: results,
        page,
        baseUrl,
        totalSize: results.length,
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
