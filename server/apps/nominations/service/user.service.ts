import { Nominator } from '../../../entities';

import logger from "../../lib/logger";
import { createPagedResults } from "../../lib/table/table";

// TODO: Criteria that determines whether or not a user account is pending approval
const Criteria = {
  PENDING: { emailVerified: true, approved: false },
  LIVE: { active: true, approved: true }
};

export async function query({
    page,
    search,
    baseUrl = '',
    whitelist = [],
    query = {affiliationId: undefined}
  }) {
    try {
      const searchQuery = search && {
        keys: [
          'lastName',
          'firstName',
          ],
        search
      };
  
      let sqlQuery =  Nominator.createQueryBuilder("user")
      if(query.affiliationId) {
        sqlQuery = sqlQuery.where("user.affiliation_id = :affiliation_id", { affiliation_id: query.affiliationId})
      } else {
        // TODO: why search only live users?
        sqlQuery = sqlQuery
          .where("user.active = :active", {active: Criteria.LIVE.active})
          .andWhere("user.approved = :approved", {approved: Criteria.LIVE.approved})
      }

      const results = await sqlQuery.getMany()
      console.log(results)

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

export async function getPendingUsers ({
  page,
  search,
  baseUrl = '',
  whitelist = [],
}) {
    try {
      
      const searchQuery = search && {
        keys: [
          'lastName',
          'firstName',
          ],
        search
      };

      let sqlQuery =  Nominator.createQueryBuilder("user");

      sqlQuery = sqlQuery
        .where("user.email_verified = :email_verified", {active: Criteria.PENDING.emailVerified})
        .andWhere("user.approved = :approved", {approved: Criteria.PENDING.approved});

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

  export async function getById(id) {
    return await Nominator.findOneById(id, { relations: ['households']})
  }