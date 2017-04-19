var passport = require('passport');

module.exports = {
    // Authentication Verification
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    },

    login: {
        get: function(req, res) {
	    res.render('login', {title: 'Login', content: 'This is the Login page'});
	},
        post: passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    },

    register: {
        get: function(req, res, next) {
	    res.render('register',{title:'Register', content:'This is the registration page'});
	},
        post: passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        })
    },

    logout: function(req, res) {
	req.session.destroy(function(err) {
	    res.redirect('/login');
	});
    }
}

