var express = require('express');
var passport = require('passport');

var router = express.Router();

// Authentication Verification
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.redirect('/login');
}

// Define controllers
var Home = require('./controllers/Home');
var Login = require('./controllers/Login');
var Register = require('./controllers/Register');

// Define Routes
router.get('/', isLoggedIn, function(req, res) {
  Home.run(req, res);
});
router.get('/login', function(req, res) {
  Login.run(req, res);
});
router.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login'
    }
));
router.get('/logout', function(req, res) {
  Login.logout(req, res);
});
router.get('/register', function(req, res) {
  Register.run(req, res);
});
router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/register'
}));

module.exports = router;
