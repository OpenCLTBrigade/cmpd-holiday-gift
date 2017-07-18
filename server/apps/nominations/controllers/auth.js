var passport = require('passport');
var config = require('../../../config');
var path = require('path');
var sendMail = require('../../lib/mail')(path.join(__dirname, '../views/email'));

var db = require('../../../models');

module.exports = {
  // Authentication Verification
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ 'error': 'Unauthorized' });
  },

  login: passport.authenticate('local-signin', redirects),

  // TODO: the validation error isn't being handled properly:
  // "Unhandled rejection SequelizeValidationError: Validation error: Validation isEmail failed"
  register: passport.authenticate('local-signup', redirects),

  confirm: {
    get: function (req, res) {
      // TODO handle confirmation correctly
      var _id = req.query.id;
      var _confirm_code = req.query.confirmation_code;
      // TODO: handle email sending errors
      sendMail('admin-approval', { to: config.email.adminAddress });
      res.renderData('confirm', 'Confirm Email Address', {});
    }
  }
};
