// @flow

var express = require('express');

var auth = require('../lib/auth');
var config = require('../../config');

var app = express();

// Add authentication
app.use(auth.authMiddleware(config.jwtSecrets.nominations));
app.use(auth.sessionMiddleware);

// Load the routess
app.use(require('./routes'));

module.exports = app;
