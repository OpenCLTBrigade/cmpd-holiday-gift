// @flow

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const db = require('../../models');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

import type { AuthRequest, Response, Next } from '../lib/typed-express';

export type RoleType = null | 'admin';
export type AnyRole = RoleType;
export type AdminRole = 'admin';

// TODO: import from model
export type UserType = {
  id: number,
  approved: boolean,
  active: boolean,
  role: RoleType
};

export type LoggedInUser = UserType & { approved: true, active: true };

export type UserIdRequest = AuthRequest<{id: number}>;
export type SessionIdRequest = AuthRequest<{session_id: number}>;
export type AppName = 'nominations';
export type UserRequest<Role: RoleType = RoleType, Params = {}> = AuthRequest<UserType & { role: Role }, Params>;

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
function authMiddleware(secret: string): $TODO {
  return jwtMiddleware({
    secret: secret,
    credentialsRequired: false,
    getToken: req => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.body && req.body.__authorization) {
        return req.body.__authorization;
      }
      return null;
    }
  });
}

async function sessionMiddleware(
  req: UserIdRequest & SessionIdRequest & {user: null},
  res: Response,
  next: Next
): Promise<void> {
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

function ensureLoggedIn<Req: AuthRequest<?UserType>>(_: Req): [Req & {user: LoggedInUser}, *] {
  return [
    (undefined: any),
    (req: Req, res: Response, next: Next) => {
      // TODO: active and approved should be in the type
      if (req.user && req.user.active && req.user.approved) {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  ];
}

function ensureAdmin<Req: AuthRequest<?UserType>>(_: Req): [Req & {user: UserType & {role: 'admin'}}, *] {
  return [
    (undefined: any),
    (req: Req, res: Response, next: Next) => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  ];
}

function isInvalidPassword(password: string): null | string {
  if (!password || password.length < 6) {
    return 'too short';
  }
  return null;
}
isInvalidPassword.english = 'The password must have 6 or more characters';

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

module.exports = {
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
};
