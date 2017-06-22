var Express = require('express');
var { Household, User, Auth, Dashboard } = require('./controllers');

let router = Express.Router();
router.get('/', Auth.isLoggedIn, Dashboard);

router.get('/login', Auth.login.get);
router.post('/login', Auth.login.post);
router.get('/logout', Auth.logout);
router.get('/register', Auth.register.get);
router.post('/register', Auth.register.post);
router.get('/register/confirm_email', Auth.confirm.get);

// TODO: require more than isLoggedIn for these tasks
router.get('/households', Auth.isLoggedIn, Household.list);

router.get('/api/user', Auth.isLoggedIn, User.list);

router.get('/users', Auth.isLoggedIn, User.list);

module.exports = router;
