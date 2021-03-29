module.exports = {
  authenticator: (req, res, next) => {
    // User must login before accessing other pages
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}
