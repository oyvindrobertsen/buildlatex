var router = require('express').Router(),
    User = require('../models/User').User,
    ensureAuth = require('../middleware/auth').ensureAuth;

router.get('', function(req, res) {
  if (req.session.user_id) {
    new User({id: req.session.user_id})
      .fetch()
      .then(function(u) {
        if (!u) {
          throw Error('No user with user_id');
        }
        res.redirect('/users/' + u.attributes.username);
      });
  } else {
    res.render('index.jade');
  }
});

exports.indexRouter = router;
