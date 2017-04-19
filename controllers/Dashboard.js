module.exports = function(req, res) {
    res.render('dashboard', { name: req.user.firstname });
};
