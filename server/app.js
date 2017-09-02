// Dependencies for app
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    path = require('path'),
    http = require('http');
// create instance of express
var app = express();

// require routes
var routes = require('./routes/api.js');

//app.use(favicon(__dirname + '/public/favicon.ico'));

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));



// routes
app.use('/', routes);
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


module.exports = app;