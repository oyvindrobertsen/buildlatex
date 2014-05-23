var router = require('express').Router(),
    ensureAuth = require('../middleware/auth').ensureAuth;

router.get('', function(req, res) {
  res.render('index.jade');
});

router.get('/secret', ensureAuth, function(req, res) {
  res.send('You are logged in!');
});

exports.indexRouter = router;
