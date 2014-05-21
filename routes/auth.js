var mongoose = require('mongoose'),
    router = require('express').Router(),
    User = require('../models').User,
    github = require('../config/github'),
    rest = require('../util/rest');

mongoose.connect('mongodb://localhost/buildlatex');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Database connection established.');
});

var oauth2 = require('simple-oauth2')({
    clientID: github.ID,
    clientSecret: github.secret,
    site: 'https://github.com/login',
    tokenPath: '/oauth/access_token'
});

var authorization_uri = oauth2.AuthCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/github-callback',
    scope: 'user',
    state: 'E09Z79ZPpW'
});

function GitHubAPIOptions(token) {
    this.host = 'api.github.com';
    this.port = 443;
    this.path = null;
    this.method = null;
    this.headers = {
        'Content-Type': 'application/json',
        'user-agent': 'buildlatex',
        'Authorization': 'token ' + token
    };
}

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
            user = new User({accessToken: tokenObj.token.split('&')[0].split('=')[1]}),
            o = new GitHubAPIOptions(user.accessToken);
        o.path = '/user;
        o.method = 'GET';
        rest.getJSON(o, function(statusCode, result) {
            res.statusCode = statusCode;
            res.send(result);
        })
    }
});

exports.authRouter = router;
