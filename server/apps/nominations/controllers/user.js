var db = require('../../../models');

// TODO: move user endpoints to auth app

module.exports = {
  list: async (req, res) => {
    // TODO: Filtering and sorting
    var users = await db.user.findAll();

    // TODO: Passing in where clauses as needed... http://docs.sequelizejs.com/manual/tutorial/querying.html#where
    res.json({ users });
  },

  getUser: async (req, res) => {
    let user = null;
    try {
      user = await db.user.findById(req.params.id);
    } catch (err) {
      user = null;
    }
    if (user === null) {
      res.status(404);
    }
    res.json({ data: user });
  }
};
