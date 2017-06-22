module.exports = function (req, res) {
  res.renderData('dashboard', 'Dashboard', { user: req.user });
};
