var TableApi = require('../../lib/tableApi');
const db = require('../../../models');

var whiteList = ['id', 'type', 'name'];

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req, 1000);
    try {
      // Limit fields shown to guests
      if (req.user) {
        whiteList = null;
      }
      // Filter by name
      let whereClause = {};
      if (req.query.search) {
        whereClause = { name: { $like: `${req.query.search}%` } };
      }
      let result = await api.fetchAndParse('affiliation', whereClause, null, '', whiteList);
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getAffiliation: async (req, res) => {
    let id = parseInt(req.params.id);
    let affiliation = await db.affiliation.findById(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
};
