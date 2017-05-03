var db = require('../../../models');

module.exports = {
    list: async (req, res) => {
        // TODO: paging, search
        var households = await db.household.findAll();
        res.renderData('household/list', 'Households', {households, user: req.user});
    },
    edit: {
        get: async (req, res) => {
            var household = await db.household.findById(req.params.id);
            res.renderData('household/edit', 'Edit Household', {household, user: req.user});
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
