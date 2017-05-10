var express = require('express');

var dashboard = require('./controllers/dashboard'),
    auth = require('./controllers/auth'),
    household = require('./controllers/household');

var router = express.Router();

router.get('/', auth.isLoggedIn, dashboard);

router.get('/login', auth.login.get);
router.post('/login', auth.login.post);
router.get('/logout', auth.logout);
router.get('/register', auth.register.get);
router.post('/register', auth.register.post);
router.get('/register/confirm_email', auth.confirm.get);

// TODO: require more than isLoggedIn for these tasks
router.get('/household/new', auth.isLoggedIn, household.create.get);
router.post('/household/new', auth.isLoggedIn, household.create.post);
router.get('/household/:id/edit', auth.isLoggedIn, household.edit.get);
router.post('/household/:id/edit', auth.isLoggedIn, household.edit.post);
router.get('/households', auth.isLoggedIn, household.list);

module.exports = router;
