module.exports = function(req, res, next) {
    res.render('dashboard', { name: req.user.firstname });
};
