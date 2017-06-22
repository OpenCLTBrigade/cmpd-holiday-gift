var db = require('../../../models');

module.exports = {
    list: async (req, res) => {
    // TODO: Filtering and sorting
        var users = await db.user.findAll();

    // TODO: Passing in where clauses as needed... http://docs.sequelizejs.com/manual/tutorial/querying.html#where
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
