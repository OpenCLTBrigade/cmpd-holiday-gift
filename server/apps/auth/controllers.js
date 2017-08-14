// @flow
var config = require('../../config');
var auth = require('../lib/auth');
var db = require('../../models');
var registration = require('../lib/registration');
var { rootUrl } = require('../lib/misc');

import type { $Request, $Response } from 'express';
import type { AppName } from '../lib/auth';

type RegisterRequest = {|
  firstname: string,
  lastname: string,
  rank: string,
  phone: string,
  affiliation: number,
  email: string,
  password: string
|};
async function register(req: $Request & {body: RegisterRequest}, res: $Response): Promise<void> {
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

type LoginRequest = {|
  email: string,
  password: string
|};
async function login(req: $Request & { body: LoginRequest }, res: $Response): Promise<void> {
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

async function extend(req: {user?: {id: number}}, res: $Response): Promise<void> {
  if (req.user && req.user.id) {
    // TODO: extend existing session instead
    var session = await db.session.create({ user_id: req.user.id });
    res.json({ token: auth.makeToken({ session_id: session.id }, config.jwtSecrets.auth, config.authTokenLifetime) });
  } else {
    res.status(403).send();
  }
}

type AccessRequest = {|
  app: AppName
|};
async function getToken(req: {user?: $TODO, body: AccessRequest}, res: $Response): Promise<void> {
  if (req.user && auth.userCanUseApp(req.user, req.body.app)) {
    res.json({ token: auth.makeToken({ id: req.user.id }, config.jwtSecrets[req.body.app], config.appTokenLifetime) });
  } else {
    res.status(403).send();
  }
}

type ConfirmRequest = {|
  id: number,
  confirmation_code: string
|};
async function confirm(req: $Request & {body: ConfirmRequest}, res: $Response): Promise<void> {
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

type ApproveRequest = {
  user_id: number
};
async function approve(req: {body: ApproveRequest}, res: $Response): Promise<void> {
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
