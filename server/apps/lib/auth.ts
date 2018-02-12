import * as bcrypt from 'bcrypt-nodejs'
import * as crypto from 'crypto'

const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
import config from '../../config'
import { Session, User } from '../../entities'
import logger from '../../common/util/logger';

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
export type AppName = string | 'nominations';

// TODO: automatically delete expired sessions from database

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
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

      const session = await Session.findOneById(req.user.session_id);

      if (!session) {
        logger.info('session does not exist for user', { session: req.user.session_id })
        req.user = null;
      } else {
        logger.info('session exists for user', { session: req.user.session_id })

        // TODO: validate session expiration
        user = session.user;
        req.user = user;
      }
    } else if (req.user.id != null) {
      // When used by an application service
      user = await User.findOneById(req.user.id);
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

async function createSession(user_id: number): Promise<string> {

  const session = new Session();

  session.userId = user_id;

  await session.save();

  logger.info('created new session', session)

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
  createSession
}