var express = require('express');

var Dashboard = require('./controllers/Dashboard'),
    Auth = require('./controllers/Auth'),
    Household = require('./controllers/Household');

var router = express.Router();

router.get('/', Auth.isLoggedIn, Dashboard);

router.get('/login', Auth.login.get);
router.post('/login', Auth.login.post);
router.get('/logout', Auth.logout);
router.get('/register', Auth.register.get);
router.post('/register', Auth.register.post);

router.get('/household/new', Auth.isLoggedIn, Household.create.get);
router.post('/household/new', Auth.isLoggedIn, Household.create.post);
router.get('/household/:id/edit', Auth.isLoggedIn, Household.edit.get);
router.post('/household/:id/edit', Auth.isLoggedIn, Household.edit.post);
router.get('/households', Auth.isLoggedIn, Household.list);

module.exports = router;
