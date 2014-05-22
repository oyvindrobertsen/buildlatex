var express = require('express'),           // Base server
    path = require('path'),                 // FS path util
    morgan = require('morgan'),             // Logger for express
    Bookshelf = require('bookshelf'),        // ORM
    index = require('./routes/index'),      // Index routes
    auth = require('./routes/auth');        // Auth routes

Bookshelf.PG = Bookshelf.initialize({
  client: 'pg',
  debug: true,
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'buildlatex',
    charset: 'utf8'
  }
});


var app = express();

app.set('view engine', 'jade');
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.use('/', index.indexRouter);

app.use('/auth', auth.authRouter);

app.listen(app.get('port'));
console.log('Express server listening on port http://localhost:' + app.get('port'));
