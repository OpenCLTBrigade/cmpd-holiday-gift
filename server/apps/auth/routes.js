const Express = require('express');
const { login, register, getToken, confirm, extend, approve } = require('./controllers');

const router = Express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/access', getToken);
router.post('/extend', extend);
router.post('/confirm_email', confirm);
router.post('/approve', approve);

module.exports = router;
