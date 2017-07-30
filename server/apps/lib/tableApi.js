const db = require('../../models');

class TableApi {
  constructor(req, itemsPerPage = 10) {
    this.req = req;
    this.itemsPerPage = itemsPerPage;
  }

  /**
   * @param  {String}  modelName  Name of model to work with
   * @param  {Object}  [where={}] Where clause - http://docs.sequelizejs.com/manual/tutorial/querying.html#where
   * @param  {Object}  [include={}] Include related models
   * @return {Promise}            [description]
   */
  async fetch(modelName, where = {}, include = {}) {
    return await db[modelName].findAndCountAll({
      limit: this.itemsPerPage,
      offset: this.getCurrentOffset(),
      where: where,
      include: include
    });
  }

  fetchAndParse(modelName, where = {}, include = {}) {
    let resultSet = this.fetch(modelName, where, include);
    return this.parseResultSet(resultSet);
  }

  getCurrentPage() {
    let { req } = this;
    return !req.query.page || isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  }

  getCurrentOffset() {
    return (this.getCurrentPage() - 1) * this.itemsPerPage;
  }

  parseResultSet(resultSet) {
    const req = this.req;
    const currentPage = this.getCurrentPage();
    let lastPage = Math.ceil(resultSet.count / this.itemsPerPage);
    let baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

    let nextPageNumber = TableApi.calculateNextPage(req, resultSet, currentPage, lastPage);
    let previousPageNumber = TableApi.calculatePreviousPage(req, resultSet, currentPage, lastPage);

    return {
      total: resultSet.count,
      per_page: this.itemsPerPage,
      current_page: currentPage,
      last_page: lastPage,
      next_page_url: nextPageNumber !== null ? `${baseUrl}?page=${nextPageNumber}` : null,
      prev_page_url: previousPageNumber !== null ? `${baseUrl}?page=${previousPageNumber}` : null,
      from: currentPage,
      to: currentPage - 1 + resultSet.rows.length,
      data: resultSet.rows
    };
  }
}

TableApi.calculateNextPage = (req, resultSet, currentPage, lastPage) => {
  if (currentPage >= lastPage) {
    return null;
  } else if (currentPage < 1) {
    return 1;
  } else {
    return currentPage + 1;
  }
};

TableApi.calculatePreviousPage = (req, resultSet, currentPage, lastPage) => {
  if (currentPage <= 1) {
    return null;
  } else if (currentPage > lastPage) {
    return lastPage;
  } else {
    return currentPage - 1;
  }
};

module.exports = TableApi;
