var express = require('express');

// Create router
var router = express.Router();

// Load controllers
var Dashboard = require('./controllers/Dashboard'),
    Auth = require('./controllers/Auth');

// Define Routes
router.get('/', Auth.isLoggedIn, Dashboard);
router.get('/login', Auth.login.get);
router.post('/login', Auth.login.post);
router.get('/logout', Auth.logout);
router.get('/register', Auth.register.get);
router.post('/register', Auth.register.post);

module.exports = router;
