const { pick } = require('ramda');
const logger = require('../logger');
const filter = require('./filter');

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

function parseResults({ results, totalSize, fieldWhitelist, page, itemsPerPage, baseUrl }) {
  const offsets = calcOffsets({ page, itemsPerPage });

  const rows = results.rows.slice(offsets.start, offsets.end);

  const lastPage = Math.ceil(results.count / itemsPerPage);

  const nextPageNumber = calculateNextPage(page, lastPage);
  const previousPageNumber = calculatePreviousPage(page, lastPage);

  const items = fieldWhitelist ? rows.map(record => pick(fieldWhitelist, record)) : rows;

  return {
    totalSize,
    per_page: itemsPerPage,
    page: page,
    last_page: lastPage,
    next_page_url: nextPageNumber != null ? `${baseUrl}?page=${nextPageNumber}` : null,
    prev_page_url: previousPageNumber != null ? `${baseUrl}?page=${previousPageNumber}` : null,
    items
  };
}

async function fetch({ model, include = null, scope = '' }) {
  // TODO: Make include work :(
  const opts = {};

  logger.info('retrieving count', { opts });

  const count = await model.scope(scope).count(opts);

  if (include != null) {
    opts['include'] = include;
  }

  logger.info('retrieving count', { opts });

  const rows = await model.scope(scope).findAll(opts);

  logger.info(`returning ${rows.count} results`);

  return { rows, count };
}

const init = ({ model, baseUrl, fieldWhitelist = null }) => ({
  async fetch({ where, include = null, scope = '', page = 1, itemsPerPage = 10 }) {
    const { rows } = await fetch({ model, where, include, scope, page, itemsPerPage });

    const list = where ? filter({ list: rows, ...where }) : rows;

    return parseResults({ results: { rows: list }, totalSize: list.length, fieldWhitelist, page, itemsPerPage, baseUrl });
  }
});

module.exports = init;
