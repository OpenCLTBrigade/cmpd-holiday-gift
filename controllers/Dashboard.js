module.exports = function (req, res) {
    res.renderData('dashboard', 'Dashboard', {name: req.user.firstname});
};
