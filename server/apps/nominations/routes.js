var Express = require('express');
var { Household, User } = require('./controllers');
var auth = require('../lib/auth');

let router = Express.Router();

// TODO: require more than ensureLoggedIn for these tasks
router.post('/households', auth.ensureLoggedIn, Household.list);
router.get('/users', auth.ensureLoggedIn, User.list);

module.exports = router;
