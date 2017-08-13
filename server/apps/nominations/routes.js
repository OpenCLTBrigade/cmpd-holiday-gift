var Express = require('express');
var { Household, User, Me, Affiliation } = require('./controllers');
var auth = require('../lib/auth');

let router = Express.Router();

// TODO: require more than ensureLoggedIn for these tasks

// Households
router.get('/households', auth.ensureLoggedIn, Household.list);

// Users
router.get('/me', auth.ensureLoggedIn, Me.getMe);
router.get('/users', auth.ensureLoggedIn, User.list);
router.get('/users/:id', auth.ensureLoggedIn, User.getUser);

// Affiliations
router.get('/affiliations', Affiliation.list);
router.get('/affiliations/:id', auth.ensureLoggedIn, Affiliation.get);
module.exports = router;
