// @flow
const db = require('../../models');
const { Router, proxy } = require('../lib/typed-express');
const { Household, User, Me, Affiliation, Reports, Slips } = require('./controllers');
const auth = require('../lib/auth');
const validators = require('./validators/household');

import type { UserRequest } from '../lib/auth';

const router: Router<UserRequest<>> = new Router();

// TODO: require more than ensureLoggedIn for these tasks

// Households
router.get('/households').use(auth.ensureLoggedIn).handleAsync(Household.list);
router.get('/households/:id', (proxy: {id: string})).use(auth.ensureLoggedIn).handleAsync(Household.getHousehold);
router.put('/households/:id', (proxy: {id: string})).use(auth.ensureAdmin).use(validators).handleAsync(Household.updateHousehold);
router.post('/households').use(auth.ensureAdmin).use(validators).handleAsync(Household.createHousehold);
router.post('/households/submit').use(auth.ensureAdmin).handleAsync(Household.submitNomination);
router.post('/households/:id/upload').use(auth.ensureAdmin).handleAsync(Household.createAttachments);
router.post('/households/:id/attachments').use(auth.ensureAdmin).handleAsync(Household.createAttachments);
router.get('/households/:id/attachments').use(auth.ensureAdmin).handleAsync(Household.getAttachments);

// Users
router.get('/me').use(auth.ensureLoggedIn).handleAsync(Me.getMe);
router.get('/users/pending').use(auth.ensureAdmin).handleAsync(User.listPendingUsers);
router.get('/users').use(auth.ensureAdmin).handleAsync(User.list);
router.post('/users').use(auth.ensureAdmin).handleAsync(User.createUser);
router.post('/users/:id/approve').use(auth.ensureAdmin).handleAsync(User.approveUser);
router.post('/users/:id/decline').use(auth.ensureAdmin).handleAsync(User.declineUser);
router.put('/users/:id').use(auth.ensureAdmin).handleAsync(User.updateUser);
router.get('/users/:id', (proxy: {id: string})).use(auth.ensureLoggedIn).handleAsync(User.getUser);

// Affiliations
router.get('/affiliations').handleAsync(Affiliation.list);
router.get('/affiliations/:id', (proxy: {id: string})).use(auth.ensureLoggedIn).handleAsync(Affiliation.getAffiliation);

// Reports
router.post('/report/all').use(auth.ensureAdmin).handleAsync(Reports.export_data_excel);
router.post('/report/link').use(auth.ensureAdmin).handleAsync(Reports.link_report);
router.post('/report/bikes').use(auth.ensureAdmin).handleAsync(Reports.bike_report);
router.post('/report/division').use(auth.ensureAdmin).handleAsync(Reports.division_report);

// Slips
router.get('/slips/packing').use(auth.ensureAdmin).handleAsync(Slips.packing);

router.get('/test').handleAsync(async function (req, res) {
  const households = await db.household.findAll({
    where: { approved: true },
    include: [
      { model: db.household_address, as: 'address' },
      { model: db.household_phone, as: 'phones' }
    ]
  });

  console.error('TODO');
  return (res.json(households));
});

module.exports = router;
