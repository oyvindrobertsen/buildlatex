var router = require('express').Router(),
    User = require('../models/User').User,
    githubOpts = require('../util/github').githubAPIOptions,
    rest = require('../util/rest'),
    ensureAuth = require('../middleware/auth').ensureAuth;

router.get('', function(req, res) {
  if (req.session.user_id) {
    res.redirect('/settings');
  } else {
    res.render('index.jade');
  }
});

router.get('/settings', ensureAuth, function(req, res) {
  User.findUserByUserId(req.session.user_id).then(function(u) {
    u = u.toJSON();
    var ctx = {user: u};
    var o = new githubOpts(u.access_token);
    o.path = '/user/repos?type=owner';
    o.method = 'GET';
    rest.getJSON(o, function(statusCode, result) {
      ctx.repos = result;
      res.render('settings.jade', ctx);
    });
  });
});

exports.indexRouter = router;
