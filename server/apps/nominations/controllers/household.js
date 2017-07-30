var db = require('../../../models');
var tableApi = require('../../lib/tableApi');

const related = {
  include: [
    { model: db.child, as: 'children' },
    { model: db.user, as: 'nominator' }
  ]
};

module.exports = {
  list: async (req, res) => {
    let resultSet = tableApi.fetchAndParse('Household', {}, related)
    res.json(resultSet);
  },
  edit: {
    get: async (req, res) => {
      var household = await db.household.findById(req.params.id, {
        include: [
                    { model: db.child, as: 'children' },
                    { model: db.household_address, as: 'address' }
        ]
      });
      var schools = await db.affiliation.findAll({
        attributes: ['id', 'name'],
        where: { type: 'cms' }
      });
      res.json({ household, schools });
    },
    post: (_req, _res) => {

    }
  },
  create: {
    get: (_req, _res) => {

    },
    post: (_req, _res) => {

    }
  }
};
