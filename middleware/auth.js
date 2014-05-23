exports.ensureAuth = function(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
  } else {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}
