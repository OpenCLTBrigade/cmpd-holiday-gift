var db = require('../../../models');
var TableApi = require('../../lib/tableApi');

const RELATED_MODELS = [{ model: db.affiliation, as: 'affiliation' }];

// TODO: Criteria that determines whether or not a user account is pending approval
const PENDING_CRITERIA = { active: 'Y', approved: 'N' };
const APPROVED_CRITERA = { active: 'Y', approved: 'Y' };

const FILTERED_BY_USER = function (user) {
  return { method: ['filteredByUser', user] };
};

// TODO: move user endpoints to auth app

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req);
    try {
      let whereClause = {};
      if (req.query.search) {
        whereClause = Object.assign({ name_last: { $like: `${req.query.search}%` } }, APPROVED_CRITERA);
      }
      let result = await api.fetchAndParse('user', whereClause, RELATED_MODELS, FILTERED_BY_USER(req.user));
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  listPendingUsers: async (req, res) => {
    let api = new TableApi(req);
    try {
      // TODO: Confirm criteria for what makes a pending user
      let whereClause = PENDING_CRITERIA;
      if (req.query.search) {
        whereClause = Object.assign(PENDING_CRITERIA, { name_last: { $like: `${req.query.search}%` } });
      }
      let result = await api.fetchAndParse('user', whereClause, RELATED_MODELS, FILTERED_BY_USER(req.user));
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
