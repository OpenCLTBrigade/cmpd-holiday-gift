var TableApi = require('../../lib/tableApi');

module.exports = {
  list: async (req, res) => {
    let api = new TableApi(req, 1000);
    try {
      let whiteList = [];
      if (req.user) {
        whiteList = null;
      } else {
        whiteList = ['id', 'type', 'name'];
      }
      let result = await api.fetchAndParse('affiliation', null, null, '', whiteList);
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  }
};
