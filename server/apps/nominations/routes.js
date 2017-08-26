// @flow

const { Router, proxy } = require('../lib/typed-express');
const { Household, User, Me, Affiliation, Reports } = require('./controllers');
const auth = require('../lib/auth');

import type { UserRequest } from '../lib/auth';

const router: Router<UserRequest<>> = new Router();

// TODO: require more than ensureLoggedIn for these tasks

// Households
router.get('/households').use(auth.ensureLoggedIn).handleAsync(Household.list);
router.get('/households/:id', (proxy: {id: string})).use(auth.ensureLoggedIn).handleAsync(Household.getHousehold);

// Users
router.get('/me').use(auth.ensureLoggedIn).handleAsync(Me.getMe);
router.get('/users/pending').use(auth.ensureAdmin).handleAsync(User.listPendingUsers);
router.get('/users').use(auth.ensureAdmin).handleAsync(User.list);
router.get('/users/:id', (proxy: {id: string})).use(auth.ensureAdmin).handleAsync(User.getUser);

// Affiliations
router.get('/affiliations').handleAsync(Affiliation.list);
router.get('/affiliations/:id', (proxy: {id: string})).use(auth.ensureLoggedIn).handleAsync(Affiliation.getAffiliation);

// Reports
router.post('/report/all').use(auth.ensureAdmin).handleAsync(Reports.export_data_excel);
router.post('/report/link').use(auth.ensureAdmin).handleAsync(Reports.link_report);
router.post('/report/bikes').use(auth.ensureAdmin).handleAsync(Reports.bike_report);

module.exports = router;
