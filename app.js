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

// connect to databse
const db = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// session middleware
app.use(session({
  secret: 'mySecret', // can add it at another file as key value and put his key
  resave: false,
  saveUninitialized: false
}));

// bring passport and session passport
app.use(passport.initialize());
app.use(passport.session());
// store user at session
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// bring body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

//connect flash config
app.use(flash())


// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//bring static public Folder
app.use(express.static('node_modules'));

//bring static bublic uploads for access to images direct
app.use(express.static('uploads'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookieParser middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
