var passport = require('passport');

var redirects = {
    successRedirect: '/',
    failureRedirect: '/login'
};

var db = require('../../../models');

module.exports = {
    // Authentication Verification
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    },

    login: {
        get: function (req, res) {
            res.renderData('login', 'Login', {});
        },
        post: passport.authenticate('local-signin', redirects)
    },

    register: {
        get: async (req, res) => {
            var affiliation = await db.affiliation.findAll();
            res.renderData('register', 'Register', {affiliation});
        },
        // TODO: the validation error isn't being handled properly:
        // "Unhandled rejection SequelizeValidationError: Validation error: Validation isEmail failed"
        post: passport.authenticate('local-signup', redirects)
    },

    logout: function (req, res) {
        req.session.destroy(function () {
            res.redirect('/login');
        });
    }
};
