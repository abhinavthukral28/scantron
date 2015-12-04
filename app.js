var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var testsamples = require('./routes/testsample');
var Student = require('./models/Student.js').model;
var questionRoute = require('./routes/question.js');
var app = express();
require("mongoose").connect('mongodb://localhost:27017');
var init = require("./dbInit");
init();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/login",authenticate);
app.use("/all",questionRoute);
//app.use("updateQuestion");
app.use('/', routes);
app.use('/users', users);
app.use('/testsample', testsamples);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
    message: err.message,
    error: {}
  });
});


function authenticate(request, response, next) {



    var username  = request.cookies.username ||request.body["username"];
    var password = request.cookies.password ||request.body["password"];
    // auth is a base64 representation of (username:password)
    //so we will need to decode the base64
    if(!username || !password){
        //note here the setHeader must be before the writeHead
        response.render("login");

    }
    else{

        console.log("User: ", username);
        console.log("Password: ", password);

       // var authorized = false;
        Student.get(username,password, function (err, student) {
            if (student) {
                response.writeHead(200, [
                    ['Set-Cookie', 'username='+username],
                    ['Set-Cookie', 'password='+password]
                ]);
                //response.statusCode = 302;

             //   response.statusCode = 200;
                response.end();
                // response.end();
            }
            else{
                //we had an authorization header by the user:password is not valid
          //      response.writeHead(401, {'Content-Type': 'text/html'});
                response.render('login');

            }

        });


    }
}



module.exports = app;
