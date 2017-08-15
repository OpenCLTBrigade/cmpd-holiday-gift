

var Express = require('express');
var { Household, User, Me, Affiliation } = require('./controllers');
var auth = require('../lib/auth');

import type {Router} from '../types';

let router: Router = (Express.Router(): any);

// TODO: require more than ensureLoggedIn for these tasks

// Households
router.get('/households', auth.ensureLoggedIn, Household.list);
router.get('/households/:id', auth.ensureLoggedIn, Household.getHousehold);

// Users
router.get('/me', auth.ensureLoggedIn, Me.getMe);
router.get('/users', auth.ensureLoggedIn, User.list);
router.get('/users/pending', auth.ensureLoggedIn, User.listPendingUsers);
router.get('/users/:id', auth.ensureLoggedIn, User.getUser);

// Affiliations
router.get('/affiliations', Affiliation.list);
router.get('/affiliations/:id', auth.ensureLoggedIn, Affiliation.getAffiliation);
module.exports = router;
