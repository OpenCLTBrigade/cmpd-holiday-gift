var config = require('../../config');
var auth = require('../lib/auth');
var db = require('../../models');
var registration = require('../lib/registration');
var { rootUrl } = require('../lib/misc');

async function register(req, res) {
  var error = await registration.steps.register(rootUrl(req), {
    name_first: req.body.firstname,
    name_last: req.body.lastname,
    rank: req.body.rank,
    phone: req.body.phone,
    affiliation_id: req.body.affiliation,
    email: req.body.email,
    raw_password: req.body.password
  });
  if (error) {
    res.json(error);
  } else {
    res.json({ success: true });
  }
}

async function login(req, res) {
  var user = await db.user.findOne({ where: { email: req.body.email } });
  if (user && auth.validHashOfPassword(user.password, req.body.password)) {
    // TODO handle errors from create
    var session = await db.session.create({ user_id: user.id });
    res.json({ token: auth.makeToken({ session_id: session.id }, config.jwtSecrets.auth, config.authTokenLifetime) });
  } else {
    // Unknown username or invalid password
    res.json({ failed: true });
  }
}

async function extend(req, res) {
  if (req.user.id) {
    // TODO: extend existing session instead
    var session = await db.session.create({ user_id: req.user.id });
    res.json({ token: auth.makeToken({ session_id: session.id }, config.jwtSecrets.auth, config.authTokenLifetime) });
  } else {
    res.status(403).send();
  }
}

async function getToken(req, res) {
  if (req.user && auth.userCanUseApp(req.user, req.body.app)) {
    res.json({ token: auth.makeToken({ id: req.user.id }, config.jwtSecrets[req.body.app], config.appTokenLifetime) });
  } else {
    res.status(403).send();
  }
}

async function confirm(req, res) {
  var error = await registration.steps.confirmEmail(rootUrl(req), {
    user_id: req.body.id,
    confirmation_code: req.body.confirmation_code
  });
  if (error) {
    res.json(error);
  } else {
    res.json({ success: true });
  }
}

async function approve(req, res) {
  var error = await registration.steps.approve(req.body.user_id);
  if (error) {
    res.json(error);
  } else {
    res.json({ success: true });
  }
}

module.exports = {
  login,
  register,
  getToken,
  confirm,
  extend,
  approve
};
