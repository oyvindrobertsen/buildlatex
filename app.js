var express = require('express'),           // Base server
    path = require('path'),                 // FS path util
    morgan = require('morgan'),             // Logger for express
    index = require('./routes/index');      // Index routes

var app = express();

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.get('/', index.home);

app.listen(3000);
