var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
// require('./config/passport')(passport); // pass passport for configuration
var routes = require('./routes/index');
var users = require('./routes/users');
var testsamples = require('./routes/testsample');
var Student = require('./models/Student.js').model;
var app = express();
require("mongoose").connect('mongodb://localhost:27017');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//auth stuff -----start
app.use(session({ secret: 'tester' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//auth ---end
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routes
//app.use('/login',authenticate);
app.use('/', routes);
app.use('/users', users);
app.use('/testsample', testsamples);
app.use('/signup', testsamples);
app.use('/profile', testsamples);
app.use('/logout', testsamples);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

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
    message: err.message,
    error: {}
  });
});


function authenticate(request, response, next) {


    var username = request.query['username'];
    var studentNumber = request.query['studentNumber'];
    console.log("User: ", username);
    console.log("Student number: ", studentNumber);

    var authorized = true;
    Student.get(username, studentNumber, function (err, student) {
        if (student)
            authorized = true;
    });
    if(authorized === true){
        response.statusCode = 302;
        response.header("Location", "/testsample");
        response.end();
    }








}



module.exports = app;
