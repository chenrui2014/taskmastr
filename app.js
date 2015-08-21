var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');
var agendaUI = require('agenda-ui');
var Agenda = require('agenda');
var agenda = require('./services/agenda');
var emailService = require('./services/email-service');
var async = require('async');

var MongoStore = connectMongo(expressSession);
var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');
passportConfig();

var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');

mongoose.connect(config.mongoUri);
//Ensure agenda is running at start-up
agenda.every('3 minutes', 'Agenda running');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("suzy eats a suzy snack"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
	cookie: {maxAge: null},
	name: 'connect.sid',
	secret: 'suzy eats a suzy snack',
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/agenda-ui', agendaUI(agenda, {poll: 180000}));
app.use(restrict);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('The page you\'re looking for does not exist.');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
		status: err.status,
    message: err.message,
    error: err
  });
});


module.exports = app;
