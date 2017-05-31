var Express = require('express');
var { Household, User, Auth, Dashboard } = require('./controllers');

var dashboard = require('./controllers/dashboard'),
  auth = require('./controllers/auth'),
  household = require('./controllers/household'),
  user = require('./controllers/user'),
  userApi = require('./controllers/user_api');

let router = Express.Router();
router.get('/', Auth.isLoggedIn, Dashboard);

router.get('/login', Auth.login.get);
router.post('/login', Auth.login.post);
router.get('/logout', Auth.logout);
router.get('/register', Auth.register.get);
router.post('/register', Auth.register.post);
router.get('/register/confirm_email', Auth.confirm.get);

// TODO: require more than isLoggedIn for these tasks
router.get('/household/new', Auth.isLoggedIn, Household.create.get);
router.post('/household/new', Auth.isLoggedIn, Household.create.post);
router.get('/household/:id/edit', Auth.isLoggedIn, Household.edit.get);
router.post('/household/:id/edit', Auth.isLoggedIn, Household.edit.post);
router.get('/households', Auth.isLoggedIn, Household.list);

router.get('/api/user', Auth.isLoggedIn, User.list);

router.get('/users', auth.isLoggedIn, user.list);

router.get('/api/users', auth.isLoggedIn, userApi.list);

module.exports = router;
