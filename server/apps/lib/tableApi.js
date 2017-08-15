// @flow

const misc = require('./misc');

import type { Request } from '../lib/typed-express';

type CountedSet<Row> = {
  rows: Row[],
  count: number
};

type IncludeSpec = ?{
  model: $TODO,
  as?: string
}[];

interface Model {
  scope: $TODO
}

export type TableRequest = {
  page?: number
};

class TableApi<Row: {}> {
  baseUrl: string;
  page: number;
  itemsPerPage: number;

  constructor(req: Request<>, query: TableRequest, itemsPerPage: number = 10) {
    this.baseUrl = misc.baseUrl(req);
    this.page = query.page == null ? 1 : parseInt(query.page);
    this.itemsPerPage = itemsPerPage;
  }

  async fetch(
    model: Model,                 // Name of model to work with
    where: $TODO = {},            // Where clause - http://docs.sequelizejs.com/manual/tutorial/querying.html#where
    _include: IncludeSpec = null, // Include related models
    scope: $TODO = ''             // Scope name
  ): Promise<CountedSet<Row>> {
    // TODO: Make include work :(
    let currentOffset = this.getCurrentOffset();
    let opts: Object = {
      limit: this.itemsPerPage,
      offset: currentOffset,
      where: where
    };

    if (_include != null) {
      opts['include'] = _include;
    }

    return model
      .scope(scope)
      .findAndCountAll(opts);
  }

  async fetchAndParse(
    model: Model,
    where: $TODO = {},
    include: IncludeSpec = null,
    scope: $TODO = '',
    fieldWhitelist: ?$Keys<Row>[] = null
  ): Promise<*> { // TODO: fill in type
    var results = await this.fetch(model, where, include, scope);
    return this.parseResultSet(results, fieldWhitelist);
  }

  getCurrentOffset(): number {
    return (this.page - 1) * this.itemsPerPage;
  }

  parseResultSet(
    resultSet: CountedSet<Row>,
    fieldWhitelist: ?$Keys<Row>[] = null // Fields to be returned if not null
  ): $TODO {
    let lastPage = Math.ceil(resultSet.count / this.itemsPerPage);

    let nextPageNumber = TableApi.calculateNextPage(resultSet, this.page, lastPage);
    let previousPageNumber = TableApi.calculatePreviousPage(resultSet, this.page, lastPage);

    var rows;
    if (fieldWhitelist != null) {
      var wl = fieldWhitelist;
      let newRows = [];
      resultSet.rows.forEach(record => {
        let newRecord = {};
        wl.forEach(field => {
          newRecord[field] = record[field];
        });
        newRows.push(newRecord);
      });
      rows = newRows;
    } else {
      rows = resultSet.rows;
    }

    return {
      totalSize: resultSet.count,
      per_page: this.itemsPerPage,
      page: this.page,
      last_page: lastPage,
      next_page_url: nextPageNumber != null ? `${this.baseUrl}?page=${nextPageNumber}` : null,
      prev_page_url: previousPageNumber != null ? `${this.baseUrl}?page=${previousPageNumber}` : null,
      from: this.page,
      to: this.page - 1 + rows.length,
      items: rows
    };
  }

  static calculateNextPage(resultSet, currentPage, lastPage): ?number {
    if (currentPage >= lastPage) {
      return null;
    } else if (currentPage < 1) {
      return 1;
    } else {
      return currentPage + 1;
    }
  }

  static calculatePreviousPage = (resultSet, currentPage, lastPage) => {
    if (currentPage <= 1) {
      return null;
    } else if (currentPage > lastPage) {
      return lastPage;
    } else {
      return currentPage - 1;
    }
  };
}

module.exports = TableApi;
