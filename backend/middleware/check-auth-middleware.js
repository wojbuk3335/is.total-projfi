// middleware/check-auth-middleware.js
module.exports = function (req, res, next) {
    if (req.session.user) {
      // User is logged in, redirect to home page
      return res.redirect('/admin/home');
    }
    // User is not logged in, proceed to the next middleware
    next();
  }