module.exports = {
  /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req, res) => {
    res.redirect(`/api/nominations/users/${req.user.id}`);
  }
};
