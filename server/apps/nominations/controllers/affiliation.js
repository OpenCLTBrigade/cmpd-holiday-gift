var TableApi = require('../../lib/tableApi');
const db = require('../../../models');

const guestWhiteList = ['id', 'type', 'name'];

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req, 1000);
    try {
      // Limit fields shown to guests
      var whiteList = req.user ? null : guestWhiteList;
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
    let affiliation = await db.affiliation.findFirst(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
};
