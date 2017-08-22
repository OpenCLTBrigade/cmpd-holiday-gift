const db = require('../../models');

class TableApi {
  constructor(req, itemsPerPage = 10) {
    this.req = req;
    this.itemsPerPage = itemsPerPage;
  }

  /**
   * @param  {String}  modelName  Name of model to work with
   * @param  {Object}  [where={}] Where clause - http://docs.sequelizejs.com/manual/tutorial/querying.html#where
   * @param  {Object|Null}  [include=null] Include related models
   * @param {String} [scope=''] Scope name
   * @param {Object} [scopeParams={}] Scope function arguments
   * @return {Promise}            [description]
   */
  async fetch(modelName, where = {}, _include = null, scope = '') {
    return new Promise((resolve, reject) => {
      // TODO: Make include work :(
      let currentOffset = this.getCurrentOffset();
      let opts = {
        limit: this.itemsPerPage,
        offset: currentOffset,
        where: where
      };

      if (_include != null) {
        opts['include'] = _include;
      }

      db[modelName]
        .scope(scope)
        .findAndCountAll(opts)
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async fetchAndParse(modelName, where = {}, include = null, scope = '', fieldWhitelist = null) {
    return new Promise((resolve, _reject) => {
      this.fetch(modelName, where, include, scope).then(results => {
        resolve(this.parseResultSet(results, fieldWhitelist));
      });
    });
  }

  getCurrentPage() {
    let { req } = this;
    return !req.query.page || isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  }

  getCurrentOffset() {
    return (this.getCurrentPage() - 1) * this.itemsPerPage;
  }

  /**
   * [parseResultSet description]
   * @param  {[type]} resultSet             [description]
   * @param  {Array<String>} [fieldWhitelist=null] Fields to be returned if not null
   * @return {[type]}                       [description]
   */
  parseResultSet(resultSet, fieldWhitelist = null) {
    const req = this.req;
    const currentPage = this.getCurrentPage();
    let lastPage = Math.ceil(resultSet.count / this.itemsPerPage);
    let baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

    let nextPageNumber = TableApi.calculateNextPage(req, resultSet, currentPage, lastPage);
    let previousPageNumber = TableApi.calculatePreviousPage(req, resultSet, currentPage, lastPage);

    if (fieldWhitelist != null) {
      let newRows = [];
      resultSet.rows.forEach(record => {
        let newRecord = {};
        fieldWhitelist.forEach(field => {
          newRecord[field] = record[field];
        });
        newRows.push(newRecord);
      });
      resultSet.rows = newRows;
    }

    return {
      totalSize: resultSet.count,
      per_page: this.itemsPerPage,
      page: currentPage,
      last_page: lastPage,
      next_page_url: nextPageNumber != null ? `${baseUrl}?page=${nextPageNumber}` : null,
      prev_page_url: previousPageNumber != null ? `${baseUrl}?page=${previousPageNumber}` : null,
      from: currentPage,
      to: currentPage - 1 + resultSet.rows.length,
      items: resultSet.rows
    };

    // return {
    //   total: resultSet.count,
    //   per_page: this.itemsPerPage,
    //   current_page: currentPage,
    //   last_page: lastPage,
    //   next_page_url: nextPageNumber !== null ? `${baseUrl}?page=${nextPageNumber}` : null,
    //   prev_page_url: previousPageNumber !== null ? `${baseUrl}?page=${previousPageNumber}` : null,
    //   from: currentPage,
    //   to: currentPage - 1 + resultSet.rows.length,
    //   data: resultSet.rows
    // };
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
