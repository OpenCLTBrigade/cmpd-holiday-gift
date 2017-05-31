var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
    // TODO: Filtering and sorting
    var users = await db.user.findAll();
    res.renderData('user/list', 'Users', {
      users,
      user: req.user
    });
  },

  edit: {
    get: async (req, res) => {},
    post: async (req, res) => {}
  },

  create: {
    get: (req, res) => {},
    post: (req, res) => {}
  }
};
