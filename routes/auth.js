var router = require('express').Router(),
    github = require('../config/github'),
    rest = require('../util/rest'),
    githubOpts = require('../util/github').githubAPIOptions,
    User = require('../models/User').User;

var oauth2 = require('simple-oauth2')({
  clientID: github.ID,
  clientSecret: github.secret,
  site: 'https://github.com/login',
  tokenPath: '/oauth/access_token'
});

var authorization_uri = oauth2.AuthCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/auth/github-callback',
  scope: 'user, public_repo',
  state: 'E09Z79ZPpW'
});

var getTokenString = function(param) {
  return param.split('&')[0].split('=')[1];
};

router.get('/github-redir', function(req, res) {
  res.redirect(authorization_uri);
});

router.get('/github-callback', function(req, res) {
  var code = req.query.code;
  oauth2.AuthCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:3000/auth/github-callback'
  }, saveToken);
  function saveToken(error, result) {
    if (error) {console.log('Access token error', error.message);}
    var tokenObj = oauth2.AccessToken.create(result),
        token = getTokenString(tokenObj.token);
        o = new githubOpts(token);
    o.path = '/user';
    o.method = 'GET';
    rest.getJSON(o, function(statusCode, result) {
      new User({'github_id': result.id})
        .fetch()
        .then(function(user) {
          if (!user) {
            user = User.forge({
              github_id: result.id,
              username: result.login,
              email: result.email,
              avatar_url: result.avatar_url,
              access_token: token
            });
          } else {
            user.set({
              username: result.login,
              email: result.email,
              avatar_url: result.avatar_url,
              access_token: token
            });
          }
          user.save();
          req.session.user_id = user.attributes.id;
          res.redirect('/settings');
        });
    });
  }
});

router.get('/logout', function(req, res) {
  delete req.session.user_id;
  res.redirect('/');
});

exports.authRouter = router;
