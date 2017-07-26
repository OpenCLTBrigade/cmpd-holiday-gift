var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
    // TODO: paging, search
    var households = await db.household.findAll();
    res.json({ households });
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
