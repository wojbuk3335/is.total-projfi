// middleware/is-auth-middleware.js
module.exports = function (req, res, next) {
  if (!req.session.user) {
    // User is not logged in, redirect to login page
    return res.redirect('/admin/login');
  }
  // User is logged in, proceed to the next middleware
  next();
}