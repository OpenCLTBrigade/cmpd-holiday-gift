var TableApi = require('../../lib/tableApi');

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req, 1000);
    try {
      // Limit fields shown to guests
      let whiteList = [];
      if (req.user) {
        whiteList = null;
      } else {
        whiteList = ['id', 'type', 'name'];
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
  }
};
