// @flow

const { Router } = require('../lib/typed-express');
var { Household, User, Me, Affiliation } = require('./controllers');
var auth = require('../lib/auth');

import type { Path } from '../lib/typed-express';
import type { UserRequest } from '../lib/auth';

let router: Router<UserRequest<>> = new Router();

// TODO: require more than ensureLoggedIn for these tasks

// Households
router.get('/households').use(auth.ensureLoggedIn).handleAsync(Household.list);
router.get(('/households/:id': Path<{id: string}>)).use(auth.ensureLoggedIn).handleAsync(Household.getHousehold);

/* ATN
// Users
router.get('/me', auth.ensureLoggedIn, Me.getMe);
router.get('/users', auth.ensureLoggedIn, User.list);
router.get('/users/pending', auth.ensureLoggedIn, User.listPendingUsers);
router.get('/users/:id', auth.ensureLoggedIn, User.getUser);
*/

// Affiliations
router.get('/affiliations').handleAsync(Affiliation.list);
router.get(('/affiliations/:id': Path<{id: string}>)).use(auth.ensureLoggedIn).handleAsync(Affiliation.getAffiliation);

module.exports = router;
