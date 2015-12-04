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
//app.use('/login', authenticate);
app.use('/', routes);
app.use('/users', users);
app.use('/testsample', testsamples);
app.use('/all', questionRoute);

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

    //
    //var username = request.query['username'];
    //var studentNumber = request.query['studentNumber'];
    //console.log("User: ", username);
    //console.log("Student number: ", studentNumber);
  /*  Middleware to do BASIC http 401 authentication
    */
    var auth = request.headers.authorization;
    // auth is a base64 representation of (username:password)
    //so we will need to decode the base64
    if(!auth){
        //note here the setHeader must be before the writeHead
        response.setHeader('WWW-Authenticate', 'Basic realm="need to login"');
        response.status(403);
        response.render("login");
        response.end();
    }
    else{
        console.log("Authorization Header: " + auth);
        //decode authorization header
        // Split on a space, the original auth
        //looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        var tmp = auth.split(' ');

        // create a buffer and tell it the data coming in is base64
        var buf = new Buffer(tmp[1], 'base64');

        // read it back out as a string
        //should look like 'ldnel:secret'
        var plain_auth = buf.toString();
        console.log("Decoded Authorization ", plain_auth);

        //extract the userid and password as separate strings
        var credentials = plain_auth.split(':');      // split on a ':'
        var username = credentials[0];
        var password = credentials[1];
        console.log("User: ", username);
        console.log("Password: ", password);

        Student.get(username,password, function (err, student) {
            if (student) {
                response.statusCode = 302;
                response.header("Location", "/all");
               // response.end();
            }
            else{
                //we had an authorization header by the user:password is not valid
          //      response.writeHead(401, {'Content-Type': 'text/html'});
                response.render('all');
                console.log('No authorization found, send 401.');
                response.end();
            }

        });


    }
}



module.exports = app;
