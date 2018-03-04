import { Nominator, User } from '../../../entities';

import logger from '../../lib/logger';
import { createPagedResults } from '../../lib/table/table';
import { CreateUserDto } from '../controllers/dto/create-user.dto';
import auth from '../../lib/auth';
import { UpdateUserDto } from '../controllers/dto/update-user.dto';
import { Component, ForbiddenException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'ramda';
import { ApplicationError } from '../../../common/util/application-error';

// TODO: Criteria that determines whether or not a user account is pending approval
const Criteria = {
  PENDING: { emailVerified: true, approved: false },
  LIVE: { active: true, approved: true }
};

export enum ErrorCodes {
  NoUserExists = 'NoUserExists'
}

const determineSearchQuery = search =>
  isEmpty(search)
    ? undefined
    : {
        keys: ['lastName', 'firstName'],
        search
      };

@Component()
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
        sqlQuery = sqlQuery
          .where('user.active = :active', { active: Criteria.LIVE.active })
          .andWhere('user.approved = :approved', {
            approved: Criteria.LIVE.approved
          });
      }

      const results = await sqlQuery.getMany();

      return createPagedResults({
        results,
        page,
        query: searchQuery,
        baseUrl,
        fieldWhitelist: whitelist
      });
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

      let sqlQuery = Nominator.createQueryBuilder('user');

      sqlQuery = sqlQuery
        .where('user.email_verified = :email_verified', {
          active: Criteria.PENDING.emailVerified
        })
        .andWhere('user.approved = :approved', {
          approved: Criteria.PENDING.approved
        });

      const results = await sqlQuery.getMany();

      return createPagedResults({
        results,
        page,
        query: searchQuery,
        baseUrl,
        fieldWhitelist: whitelist
      });
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

  async create({ password, ...rest }: CreateUserDto) {
    logger.info('create user');

    try {
      const user = User.fromJSON({
        password: auth.hashPassword(password),
        ...rest
      });

      const { password: omit, ...created } = await user.save();

      return created;
    } catch (error) {
      logger.error(error);
      throw new ApplicationError(error.message);
    }
  }

  async update({ id, password, ...rest }: UpdateUserDto, currentUser) {
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new ForbiddenException();
    }

    try {
      const user = await User.findOneById(id);

      if (!user) throw new NotFoundException();

      user.firstName = rest.firstName;
      user.lastName = rest.lastName;
      user.rank = rest.rank;
      user.phone = rest.phone;
      user.email = rest.email;
      user.emailVerified = rest.emailVerified;
      user.nominationLimit = rest.nominationLimit;
      user.active = rest.active;
      user.approved = rest.approved;
      user.affiliationId = rest.affiliationId;

      if (user.password && user.password != null) {
        user.password = auth.hashPassword(password);
      }

      if (currentUser.role === 'admin') {
        user.role = rest.role;
      }

      const { password: omit, ...updated } = await user.save();

      return updated;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Could not update user. Unknown error.');
    }
  }

  async approve(id) {
    try {
      const user = await User.findOneById(id);

      user.approved = true;
      user.active = true;
      user.emailVerified = true;

      const { password: omit, ...updated } = await user.save();

      return updated;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Could not update user. Unknown error.');
    }
  }

  async decline(id) {
    try {
      const user = await User.findOneById(id);

      user.approved = false;
      user.active = false;
      user.emailVerified = false;
      user.confirmationEmail = false;

      const { password: omit, ...updated } = await user.save();

      return updated;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Could not update user. Unknown error.');
    }
  }
}
