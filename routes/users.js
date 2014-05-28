var router = require('express').Router(),
    githubOpts = require('../util/github').githubAPIOptions,
    rest = require('../util/rest'),
    User = require('../models/User').User;


router.param('user', function(req, res, next, user) {
  // TODO: Add regex to check correct format of username
  new User({username: user})
    .fetch()
    .then(function(u) {
      if (!u) {
        return next(new Error('User does not exist'));
      }
      req.user = u.toJSON();
      next();
    });
});


router.get('/:user', function(req, res) {
  var ctx = {user: req.user};
  var o = new githubOpts(req.user.access_token);
  o.path = '/user/repos?type=owner';
  o.method = 'GET';
  rest.getJSON(o, function(statusCode, result) {
    ctx.repos = result;
    res.render('user.jade', ctx);
  });
});

exports.usersRouter = router;
