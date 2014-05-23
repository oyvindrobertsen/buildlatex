var express = require('express'),           // Base server
    path = require('path'),                 // FS path util
    morgan = require('morgan'),             // Logger for express
    cookieParser = require('cookie-parser'),// Cookie parser
    session = require('express-session'),   // Session middleware
    Bookshelf = require('bookshelf');       // ORM

Bookshelf.PG = Bookshelf.initialize({
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    user: '',
    database: 'buildlatex'
  }
});

/* Routes */
var index = require('./routes/index'),
    auth = require('./routes/auth');

var app = express();

app.set('view engine', 'jade');
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'this is super secret', name: 'bl'}));

app.use('/', index.indexRouter);

app.use('/auth', auth.authRouter);

app.listen(app.get('port'));
console.log('Express server listening on port http://localhost:' + app.get('port'));
