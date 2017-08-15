// @flow

var express = require('express');

var auth = require('../lib/auth');
var config = require('../../config');

var app = express();

// Add authentication
app.use(auth.authMiddleware(config.jwtSecrets.auth));
app.use((auth.sessionMiddleware: any));

// Load the routess
app.use(require('./routes').router);

module.exports = app;
