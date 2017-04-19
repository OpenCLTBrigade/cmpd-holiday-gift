module.exports = {
	name: "Home",
  run: function(req, res, next) {
		console.log(req.user.firstname);
		res.render('home');
	}
}
