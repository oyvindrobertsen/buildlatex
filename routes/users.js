var router = require('express').Router(),
    githubOpts = require('../util/github'),
    User = require('../models/User').User;


router.param('user', function(req, res, next, user) {
  // TODO: Add regex to check correct format of username
  new User({username: user})
    .fetch()
    .then(function(u) {
      if (!u) {
        return next(new Error('User does not exist'));
      }
      req.user = u;
      next();
    });
});


router.get('/:user', function(req, res) {
  res.send(req.user.attributes);
});

exports.usersRouter = router;
