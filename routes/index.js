var router = require('express').Router(),
    User = require('../models/User').User,
    ensureAuth = require('../middleware/auth').ensureAuth;

router.get('', function(req, res) {
  if (req.session.user_id) {
    res.redirect('/settings');
  } else {
    res.render('index.jade');
  }
});

router.get('/settings', ensureAuth, function(req, res) {
  res.send('Settings page');
});

exports.indexRouter = router;
