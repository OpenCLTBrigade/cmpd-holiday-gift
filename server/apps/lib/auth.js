// @flow

var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var db = require('../../models');
var jwtMiddleware = require('express-jwt');
var jwt = require('jsonwebtoken');

import type { Request, AuthRequest, Response, Middleware, Next } from '../lib/typed-express';
import type Express from 'express';

export type RoleType = null | 'admin';

// TODO: import from model
export type UserType = {
  id: number,
  approved: bool,
  active: bool,
  role: RoleType
};

export type UserIdRequest = AuthRequest<{id: number}>;
export type SessionIdRequest = AuthRequest<{session_id: number}>;
export type AppName = 'nominations';
export type UserRequest<Role = RoleType, Params = {}> = AuthRequest<UserType & { role: Role }, Params>;

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
// The token is retrieved from the Authorization header

function authMiddleware(secret: string): * {
  return jwtMiddleware({
    secret: secret,
    credentialsRequired: false
  });
}

async function sessionMiddleware(req: UserIdRequest & SessionIdRequest & {user: null}, res: Response, next: Next): Promise<void> {
  let user = null;
  if (req.user) {
    if (req.user.session_id != null) {
      // When used by the authentication service
      var session = await db.session.findById(req.user.session_id);
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

function ensureLoggedIn<
  ReqIn: AuthRequest<?UserType>,
  ReqOut: ReqIn & {user: UserType}
>(req: ReqIn, res: Response, next: Next) {
  // TODO: is this the right check for a logged in user?
  if (req.user && req.user.active && req.user.approved) {
    return next(); 
  }
  res.send(403);
};

function ensureAdmin<
  ReqIn: AuthRequest<?UserType>,
  ReqOut: ReqIn & {user: {role: 'admin'}}
>(req: ReqIn, res: Response, next: Next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.send(403);
};

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
  ensureAdmin
};
