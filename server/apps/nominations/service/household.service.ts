import Household from '../../../entities/household';

import logger from "../../lib/logger";
import { createPagedResults } from "../../lib/table/table";


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