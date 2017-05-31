var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
    var users = await db.user.findAll();
    res.json({
      data: users
    });
  }
};
