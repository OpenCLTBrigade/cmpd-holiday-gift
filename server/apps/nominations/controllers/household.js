const db = require('../../../models');
const TableApi = require('../../lib/tableApi');

const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }];

module.exports = {
  list: async (req, res) => {
    const api = new TableApi(req);
    try {
      let whereClause = {};
      if (req.query.search) {
        whereClause = { name_last: { $like: `${req.query.search}%` } };
      }
      const result = await api.fetchAndParse(
        'household',
        whereClause,
        related,
        { method: ['filteredByUser', req.user] }
      );
      res.json(result);
    } catch (err) {
      // TODO: properly log error
      console.error(err);
      res.json({ error: 'error fetching data' });
    }
  },
  getHousehold: async (req, res) => {
    let household = null;
    try {
      household = await db.household.findById(req.params.id, { include: related });
      if (!household) {
        throw new Error('Household not found');
      }
    } catch (err) {
      household = null;
      res.status(404);
    }
    // var schools = await db.affiliation.findAll({
    //   attributes: ['id', 'name'],
    //   where: { type: 'cms' }
    // });
    res.json(household);
  }
};
