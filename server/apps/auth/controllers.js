var config = require('../../config');
var path = require('path');
var sendMail = require('../lib/mail')(path.join(__dirname, 'templates'));
var auth = require('../lib/auth');
var db = require('../../models');
var asyncDo = require('../lib/asyncDo');

async function register(req, res) {
  var user = await db.user.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.json({ error: 'An account with that email already exists' });
  }
  var reason = auth.isInvalidPassword(req.body.password);
  if (reason) {
    return res.json({ error: `Invalid password: ${reason}` });
  }
  var hashedPassword = auth.hashPassword(req.body.password);
  var confirmCode = auth.generateConfirmationCode();
  // TODO: handle errors from create
  var newUser = await db.user.create({
    name_first: req.body.firstname,
    name_last: req.body.lastname,
    rank: req.body.rank,
    phone: req.body.phone,
    affiliation_id: req.body.affiliation,
    email: req.body.email,
    password: hashedPassword,
    confirmation_code: confirmCode
  });
  // TODO: regroup phases of sign-in process into same lib file
  asyncDo(sendMail('verify-email', {
    to: newUser.dataValues.email,
    user: newUser,
    confirm_email_url: req.protocol + '://' + req.get('host') + '/register/confirm_email'
  }));
  res.json({ success: true });
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
    res.status(404).send();
  }
}

function confirm(req, res) {
  // TODO actually confirm something
  var _id = req.body.id;
  var _confirm_code = req.body.confirmation_code;
  // TODO: handle email sending errors
  sendMail('admin-approval', { to: config.email.adminAddress });
  res.json({ todo: 'TODO' });
  // TODO move user registration steps into separate module
}

module.exports = {
  login,
  register,
  getToken,
  confirm,
  extend
};
