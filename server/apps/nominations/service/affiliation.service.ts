import { getRepository } from "typeorm";

import Affiliation from "../models/affiliation";

import logger from "../../lib/logger";
import { createPagedResults } from "../../lib/table/table";

export async function query({
  page,
  search,
  whitelist = ["id", "type", "name"]
}) {
  try {
    const query = {
      keys: ["name"],
      search
    };

    let results = await getRepository(Affiliation).find();
    return createPagedResults({
      results,
      page,
      query,
      baseUrl: "",
      fieldWhitelist: whitelist
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export async function getAffiliation(id) {
  try {
    let affiliation = await getRepository(Affiliation).findOneById(id);

    return affiliation;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}
