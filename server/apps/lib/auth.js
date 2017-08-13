var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var db = require('../../models');
var jwtMiddleware = require('express-jwt');
var jwt = require('jsonwebtoken');

// TODO: automatically delete expired sessions from database
// TODO: check if user is approved and active

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validHashOfPassword(hash, password) {
  return bcrypt.compareSync(password, hash);
}

function generateConfirmationCode() {
  return crypto.randomBytes(32).toString('hex');
}

// This middleware will set req.user to the token payload
// if the token is valid has has not expired.
// The token is retrieved from the Authorization header
function authMiddleware(secret) {
  return jwtMiddleware({
    secret: secret,
    credentialsRequired: false
  });
}

async function sessionMiddleware(req, res, next) {
  let user = null;
  if (req.user) {
    if (req.user.session_id) {
      // When used by the authentication service
      var session = await db.session.findById(req.user.session_id);
      if (!session) {
        req.user = undefined;
      } else {
        // TODO: validate session expiration
        user = await session.getUser();
        req.user = user;
      }
    } else if (req.user.id) {
      // When used by an application service
      user = await db.user.findById(req.user.id);
      req.user = user;
    }
  }
  next();
}

function makeToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

function ensureLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }
  res.send(403);
}

function isInvalidPassword(password) {
  if (!password || password.length < 6) {
    return 'too short';
  }
}
isInvalidPassword.english = 'The password must have 6 or more characters';

function userCanUseApp(user, app) {
  if (app === 'nominations') {
    return user.approved === 'Y' && user.active === 'Y';
  }
  return false;
}

module.exports = {
  hashPassword,
  validHashOfPassword,
  generateConfirmationCode,
  authMiddleware,
  sessionMiddleware,
  makeToken,
  ensureLoggedIn,
  isInvalidPassword,
  userCanUseApp
};
