var express = require('express'),           // Base server
    path = require('path'),                 // FS path util
    morgan = require('morgan'),             // Logger for express
    index = require('./routes/index');      // Index routes

var oauth2 = require('simple-oauth2')({
    clientID: '2a0c13259c5d3ed4066a',
    clientSecret: '8b1e157a966684e5dec02f1ba2ef07d0fdfa1f84',
    site: 'https://github.com/login',
    tokenPath: '/oauth/access_token'
});

var authorization_uri = oauth2.AuthCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'notifications',
    state: 'E09Z79ZPpW'
});

var app = express();

app.set('view engine', 'jade');
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.get('/', index.home);

app.get('/auth', function(req, res) {
    res.redirect(authorization_uri);
});

app.get('/callback', function(req, res) {
    var code = req.query.code;
    function saveToken(error, result) {
        if (error) {console.log('Access Token Error', error.message);}
        token = oauth2.AccessToken.create(result);
        console.log(token);
    }
    oauth2.AuthCode.getToken({
        code: code,
        redirect_uri: 'http://localhost:3000/callback'
    }, saveToken);
    res.send('success');
});

app.listen(app.get('port'));
console.log('Express server listening on port http://localhost:' + app.get('port'));
