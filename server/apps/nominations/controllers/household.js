var db = require('../../../models');
var TableApi = require('../../lib/tableApi');

const related = { include: [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }] };

module.exports = {
  /**
   * List households
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  list: async (req, res) => {
    let tableApi = new TableApi(req);
    let whereClause = {};
    let search = req.query.search || undefined;

    if (search) {
      // whereClause = {
      //   $or: [
      //     { name_first: { $like: `${search}%` } },
      //     { name_last: { $like: `${search}%` } }
      //   ]
      // }
      whereClause = { name_last: { $like: '$search%' } };
    }

    try {
      let result = await tableApi.fetchAndParse('household', whereClause, related);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Edit Household
   * @type {Object}
   */
  edit: {
    get: async (req, res) => {
      var household = await db.household.findById(req.params.id, { include: [{ model: db.child, as: 'children' }, { model: db.household_address, as: 'address' }] });
      var schools = await db.affiliation.findAll({
        attributes: ['id', 'name'],
        where: { type: 'cms' }
      });
      res.json({ household, schools });
    },
    post: (_req, _res) => {}
  },

  /**
   * Create and store new household record
   * @type {Object}
   */
  create: {
    get: (_req, _res) => {},
    post: (_req, _res) => {}
  }
};
