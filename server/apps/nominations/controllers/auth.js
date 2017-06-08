var passport = require('passport');
var config = require('../../../config');
var path = require('path');
var sendMail = require('../../lib/mail')(path.join(__dirname, '../views/email'));

var redirects = {
    successRedirect: '/',
    failureRedirect: '/login'
};

var db = require('../../../models');

module.exports = {
    // Authentication Verification
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
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
            var data = {affiliation: await db.affiliation.findAll()};
            if (config.mode === 'development') {
                var name = 'testuser-' + Math.random().toString(36).slice(2, 12);
                data.devel = {
                    firstname: name,
                    lastname: 'Smith',
                    phone: '123-456-7890',
                    email: `${name}@example.com`,
                    password: 'admin',
                    password_confirmation: 'admin'
                };
            }
            res.renderData('register', 'Register', data);
        },
        // TODO: the validation error isn't being handled properly:
        // "Unhandled rejection SequelizeValidationError: Validation error: Validation isEmail failed"
        post: passport.authenticate('local-signup', redirects)
    },

    confirm: {
        get: function (req, res) {
            // TODO handle confirmation correctly
            var _id = req.query.id;
            var _confirm_code = req.query.confirmation_code;
            // TODO: handle email sending errors
            sendMail('admin-approval', {to: config.email.adminAddress});
            res.renderData('confirm', 'Confirm Email Address', {});
        }
    },

    logout: function (req, res) {
        req.session.destroy(function () {
            res.redirect('/login');
        });
    }
};
