var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
    let perPage = 2;
    let offset = (!req.query.page || isNaN(req.query.page)) ? 0 : req.query.page;
    var users = await db.user.findAndCountAll({
      limit: perPage,
      offset: (offset - 1) * perPage
    });

    let resultSet = {
      total: users.count,
      per_page: perPage,
      current_page: offset,
      last_page: 'x',
      next_page_url: 'x',
      prev_page_url: 'x',
      'from': offset,
      'to': 'x',
      data: users.rows
    }

    res.json(resultSet);
  }
};
