import db from '../../models';
import { Router } from 'express';
import { Affiliation, Household, User, Me, Reports, Slips, Cmpd } from './controllers';
import auth from '../lib/auth';

const validators = require('./validators/household');

const router = Router();

// TODO: require more than ensureLoggedIn for these tasks
// TODO: Implement commented routes

// Households
router.get('/households', auth.ensureLoggedIn, Household.list);
// router.get('/households/:id', auth.ensureLoggedIn, Household.getHousehold);
// router.put('/households/:id', auth.ensureLoggedIn, validators, Household.updateHousehold);
// router.post('/households', auth.ensureLoggedIn, validators, Household.createHousehold);
// router.post('/households/submit', auth.ensureLoggedIn, Household.submitNomination);
// router.post('/households/:id/upload', auth.ensureLoggedIn, Household.createAttachments);
// router.post('/households/:id/feedback', auth.ensureLoggedIn, Household.submitFeedback);
// router.post('/households/:id/attachments', auth.ensureLoggedIn, Household.createAttachments);
// router.get('/households/:id/attachments', auth.ensureLoggedIn, Household.getAttachments);
// router.delete('/households/:id', auth.ensureAdmin, Household.removeHousehold);

// Users
// router.get('/me', auth.ensureLoggedIn, Me.getMe).use(auth.ensureLoggedIn);
// router.get('/me/limit/status', auth.ensureLoggedIn, Me.getNominationsStatus);
// router.get('/users/pending', auth.ensureAdmin, User.listPendingUsers);
// router.get('/users', auth.ensureAdmin, User.list);
// router.post('/users', auth.ensureAdmin, User.createUser);
// router.post('/users/:id/approve', auth.ensureAdmin, User.approveUser);
// router.post('/users/:id/decline', auth.ensureAdmin, User.declineUser);
// router.put('/users/:id').use(auth.ensureAdmin, User.updateUser);
// router.get('/users/:id', auth.ensureLoggedIn, User.getUser);

// Affiliations
router.get('/affiliations', Affiliation.list);
router.get('/affiliations/:id', Affiliation.getAffiliation);

// Reports
// router.post('/report/all', auth.ensureAdmin, Reports.export_data_excel);
// router.post('/report/link', auth.ensureAdmin, Reports.link_report);
// router.post('/report/bikes', auth.ensureAdmin, Reports.bike_report);
// router.post('/report/division', auth.ensureAdmin, Reports.division_report)

// CMPD Address Info
// router.get('/cmpd/address_info', auth.ensureLoggedIn, Cmpd.getAddressInfo);

// Slips - Packing slip handles both the packing slips AND bicycles
// router.get('/slips/packing', auth.ensureAdmin, Slips.packing);

// router.get('/test', async function (req, res) {
//   const households = await db['household'].findAll({
//     where: { approved: true },
//     include: [
//       { model: db['household_address'], as: 'address' },
//       { model: db['household_phone'], as: 'phones' }
//     ]
//   });

//   console.error('TODO');
//   return (res.json(households));
// })

export default router;
