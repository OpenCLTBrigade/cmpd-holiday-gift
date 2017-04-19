module.exports = {
	name: "Register",
  run: function(req, res, next) {
		res.render('register',{title:'Register', content:'This is the registration page'});
	},
  save: function(req, res, next) {
    res.render('register',{title:'Register', content:'Registering ' + req.body.username});
  }
}
