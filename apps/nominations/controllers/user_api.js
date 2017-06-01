const db = require('../../../models');
const vuetableApi = require('../../lib/vuetable-api');

module.exports = {
  list: async (req, res) => {
    let apiDetail = vuetableApi.getPageAndOffset(req);

    var resultSet = await db.user.findAndCountAll({
      limit: apiDetail.perPage,
      offset: apiDetail.offset
    });

    res.json(vuetableApi.parseResultSet(req, currentPage, resultSet));
  }
};
