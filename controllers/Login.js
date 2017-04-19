module.exports = {
	name: "Login",
  run: function(req, res) {
		res.render('login',{title:'Login', content:'This is the Login page'});
	},
  authenticate: function(req, res) {
    res.render('login',{title:'Login', content:'Authenticating! ' + req.body.email});
  },
	logout: function(req, res) {
		req.session.destroy(function(err) {
			res.redirect('/login');
		});
	}
}
