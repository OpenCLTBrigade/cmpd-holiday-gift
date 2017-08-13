var db = require('../../../models');
var TableApi = require('../../lib/tableApi');

const related = [{ model: db.affiliation, as: 'affiliation' }];

// TODO: move user endpoints to auth app

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req);
    try {
      let whereClause = {};
      if (req.query.search) {
        whereClause = { name_last: { $like: `${req.query.search}%` } };
      }
      let result = await api.fetchAndParse('user', whereClause, related, { method: ['filteredByUser', req.user] });
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getUser: async (req, res) => {
    let user = null;
    try {
      if (req.user.role !== 'admin' && parseInt(req.user.id) !== parseInt(req.params.id)) {
        throw new Error('User not found');
      }
      user = await db.user.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: db.affiliation,
            as: 'affiliation'
          }
        ]
      });
    } catch (err) {
      user = null;
    }
    if (user === null) {
      res.status(404);
    }
    res.json({ data: user });
  }
};
