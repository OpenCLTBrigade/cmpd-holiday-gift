var db = require('../../../models');

module.exports = {
  list: async (req, res) => {
    // TODO: Paging & search but we'll get there! :D
    var users = await db.user.findAll();

    res.status(200).json({
      data: users
    });
  }
};
