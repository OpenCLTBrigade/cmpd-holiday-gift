var Express = require('express');
var { login, register, getToken, confirm } = require('./controllers');

let router = Express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/access', getToken);
router.post('/confirm_email', confirm);

module.exports = router;
