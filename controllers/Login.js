module.exports = {
	name: "Login",
  run: function(req, res, next) {
		res.render('login',{title:'Login', content:'This is the Login page'});
	},
  authenticate: function(req, res, next) {
    res.render('login',{title:'Login', content:'Authenticating! ' + req.body.email});
  }
}
