var passport = require('passport');
var config = require('../../../config');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

var redirects = {
    successRedirect: '/',
    failureRedirect: '/login'
};

var sendAdminEmail = function() {
  /* TODO: Setup separate transporters for SES vs test environment
  var transporter = nodemailer.createTransport(ses({
    accessKeyId: 'amazon_id',
    secretAccessKey: 'amazon_key'
  }));
  */

  var transporter = nodemailer.createTransport({
    port: config.email.port,
    host: config.email.host,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  transporter.sendMail({
    from: config.email.email_from_address,
    to: config.email.email_admin_address,
    subject: config.email.mail_new_user_needs_approval_subject,
    html: '<p></p>'
  });
}

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
            var affiliation = await db.affiliation.findAll();
            res.renderData('register', 'Register', {affiliation});
        },
        // TODO: the validation error isn't being handled properly:
        // "Unhandled rejection SequelizeValidationError: Validation error: Validation isEmail failed"
        post: passport.authenticate('local-signup', redirects)
    },

    confirm: {
      get: function(req, res) {
        var id = req.query.id;
        var confirm_code = req.query.confirmation_code;
        sendAdminEmail();
        res.renderData('confirm', 'Confirm Email Address', {});
      }
    },

    logout: function (req, res) {
        req.session.destroy(function () {
            res.redirect('/login');
        });
    }
};
