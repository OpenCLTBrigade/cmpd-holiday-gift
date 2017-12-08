const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const db = require('../../models');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
import config from '../../config'

// TODO: import from model
export type UserType = {
  id: number,
  approved: boolean,
  active: boolean,
  role: any,
  name_first: string,
  name_last: string
};

export type LoggedInUser = UserType & { approved: true, active: true };
export type AppName = 'nominations';

// TODO: automatically delete expired sessions from database

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validHashOfPassword(hash: string, password: string): boolean {
  return bcrypt.compareSync(password, hash);
}

function generateConfirmationCode(): string {
  return crypto.randomBytes(32).toString('hex');
}

// This middleware will set req.user to the token payload
// if the token is valid has has not expired.
// The token is retrieved from the Authorization header or
// from the __authorization field of a posted form
function authMiddleware(secret: string) {
  return jwtMiddleware({
    secret: secret,
    credentialsRequired: false,
    getToken: req => {
      let authorization;
      if (req.headers.authorization) {
        authorization = req.headers.authorization;
      } else if (req.body && req.body.__authorization) {
        authorization = req.body.__authorization;
      }
      if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
      }
      return null;
    }
  });
}

async function sessionMiddleware(
  req,
  res,
  next
) {
  let user = null;
  if (req.user) {
    if (req.user.session_id != null) {
      // When used by the authentication service
      const session = await db.session.findById(req.user.session_id);
      if (!session) {
        req.user = null;
      } else {
        // TODO: validate session expiration
        user = await session.getUser();
        req.user = user;
      }
    } else if (req.user.id != null) {
      // When used by an application service
      user = await db.user.findById(req.user.id);
      req.user = user;
    }
  }
  next();
}

function makeToken(payload: Object, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn });
}

function ensureLoggedIn(req, res, next) {
  // TODO: active and approved should be in the type
  if (req.user && req.user.active && req.user.approved) {
    next();
  } else {
    res.sendStatus(403);
  }
}

function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
}
function isInvalidPassword(password: string): null | string {
  if (!password || password.length < 6) {
    return 'too short';
  }
  return null;
}
isInvalidPassword['english'] = 'The password must have 6 or more characters';

function userCanUseApp(user: UserType, app: AppName): boolean {
  if (app === 'nominations') {
    return user.approved && user.active;
  }
  return false;
}

async function newAuthSession(user_id: number): Promise<string> {
  const session = await db.session.create({ user_id });
  return makeToken({ session_id: session.id }, config.jwtSecrets.auth, config.authTokenLifetime);
}

export default {
  hashPassword,
  validHashOfPassword,
  generateConfirmationCode,
  authMiddleware,
  sessionMiddleware,
  makeToken,
  ensureLoggedIn,
  isInvalidPassword,
  userCanUseApp,
  ensureAdmin,
  newAuthSession
}