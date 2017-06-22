var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
        // TODO: paging, search
    var households = await db.household.findAll();
    res.renderData('household/list', 'Households', { households, user: req.user });
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
      res.renderData('household/edit', 'Edit Household', { household, schools, user: req.user });
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
