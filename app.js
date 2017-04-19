// Module dependencies
var express = require('express');
var path = require('path');
var config = require('./config')();
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

//Models
var models = require('./models');

var app = express();

// Configure app
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hjs');

// Use middleware
app.use(express.static(path.join(__dirname,'bower_components'), { index: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For Passport
app.use(session({
    secret: 'codeforCLT',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Define routes
app.use(require('./routes'));

//load passport strategies
require('./config/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// Start server
app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
