// @flow

var Express = require('express');
var { login, register, getToken, confirm, extend, approve } = require('./controllers');

const { Router } = require('../lib/typed-express');
const { ensureLoggedIn, ensureAdmin } = require('../lib/auth');

import type { UserType } from '../lib/auth';
import type { AuthRequest } from '../lib/typed-express';

const router: Router<AuthRequest<?UserType>> = new Router();

router.post('/login').handleAsync(login);
router.post('/register').handleAsync(register);
router.post('/access').use(ensureLoggedIn).handleAsync(getToken);
router.post('/confirm_email').handleAsync(confirm);
router.post('/extend').use(ensureLoggedIn).handleAsync(extend);
router.post('/approve').use(ensureAdmin).handleAsync(approve);

module.exports = router;;
