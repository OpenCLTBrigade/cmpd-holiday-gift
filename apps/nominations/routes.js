var express = require('express');

var dashboard = require('./controllers/dashboard'),
  auth = require('./controllers/auth'),
  household = require('./controllers/household'),
  user = require('./controllers/user'),
  userApi = require('./controllers/user_api');

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

router.get('/users', auth.isLoggedIn, user.list);

router.get('/api/users', auth.isLoggedIn, userApi.list);

module.exports = router;
