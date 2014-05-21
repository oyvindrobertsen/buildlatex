var express = require('express'),           // Base server
    path = require('path'),                 // FS path util
    morgan = require('morgan'),             // Logger for express
    index = require('./routes/index'),      // Index routes
    auth = require('./routes/auth');        // Auth routes

var app = express();

app.set('view engine', 'jade');
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.use('/', index.indexRouter);

app.use('/auth', auth.authRouter);

app.listen(app.get('port'));
console.log('Express server listening on port http://localhost:' + app.get('port'));
