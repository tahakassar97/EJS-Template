var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


const passport = require('passport');
const passportSetup = require('./config/passport-setup');
// bring passport
app.use(passport.initialize());
app.use(passport.session());
// store username at session
// app.get('*', (req, res, next) => {
//   console.log('app');
//   res.locals.user = req || null;
//   console.log(req);
//   next()
// })
// connect to databse
const db = require('./config/database');

//bring body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// express session and connect flash config
const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
  secret: 'mySecret', // can add it at another file as key value and put his key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 15
  }
}))
app.use(flash())
// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//bring static public Folder
app.use(express.static('node_modules'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
