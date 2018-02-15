const { pick } = require('ramda');

import filter from './filter';
import logger from '../logger';

function calculateNextPage(currentPage, lastPage) {
  if (currentPage >= lastPage) {
    return null;
  } else if (currentPage < 1) {
    return 1;
  } else {
    return currentPage + 1;
  }
}

function calculatePreviousPage(currentPage, lastPage) {
  if (currentPage <= 1) {
    return null;
  } else if (currentPage > lastPage) {
    return lastPage;
  } else {
    return currentPage - 1;
  }
}

function calcOffsets({ page, itemsPerPage }) {
  const start = (page - 1) * itemsPerPage;
  const end = start + (itemsPerPage - 1);

  return {
    start,
    end
  };
}

function parseResults({
  results,
  totalSize,
  fieldWhitelist,
  page,
  itemsPerPage,
  baseUrl
}) {
  const offsets = calcOffsets({ page, itemsPerPage });

  const rows = results.rows.slice(offsets.start, offsets.end);

  const lastPage = Math.ceil(totalSize / itemsPerPage);

  const nextPageNumber = calculateNextPage(page, lastPage);
  const previousPageNumber = calculatePreviousPage(page, lastPage);

  const items =
    fieldWhitelist && fieldWhitelist.length > 0
      ? rows.map(record => pick(fieldWhitelist, record))
      : rows;

  return {
    totalSize,
    per_page: itemsPerPage,
    page: page,
    last_page: lastPage,
    next_page_url:
      nextPageNumber != null ? `${baseUrl}?page=${nextPageNumber}` : null,
    prev_page_url:
      previousPageNumber != null
        ? `${baseUrl}?page=${previousPageNumber}`
        : null,
    items
  };
}

async function fetch({ model, include = null, scope = '' }) {
  // TODO: Make include work :(
  const opts = {};

  logger.info('retrieving count', { opts });

  if (include != null) {
    opts['include'] = include;
  }

  logger.info('retrieving count', { opts });
  logger.info(model);
  const rows = await model.scope(scope).findAll(opts);

  logger.info(`returning ${rows.count} results`);

  return { rows };
}

const init = ({ model, baseUrl, fieldWhitelist = null }) => ({
  async fetch({
    where,
    include = null,
    scope = '',
    page = 1,
    itemsPerPage = 10
  }) {
    const { rows } = await fetch({ model, include, scope });

    const list = where ? filter({ list: rows, ...where }) : rows;

    return parseResults({
      results: { rows: list },
      totalSize: list.length,
      fieldWhitelist,
      page,
      itemsPerPage,
      baseUrl
    });
  }
});

type PageResultProps = {
  results: any[];
  page: number;
  itemsPerPage?: number;
  query?: { keys: string[]; search: string };
  fieldWhitelist?: string[];
  baseUrl: string;
};

export const createPagedResults = ({
  results,
  page = 1,
  itemsPerPage = 10,
  query = undefined,
  fieldWhitelist = undefined,
  baseUrl
}: PageResultProps) => {
  const filtered = query ? filter({ list: results, ...query }) : results;

  return parseResults({
    results: { rows: filtered },
    totalSize: filtered.length,
    fieldWhitelist,
    page,
    itemsPerPage,
    baseUrl
  });
};

export default init;
