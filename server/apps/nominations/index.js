// @flow

const express = require('express');

const auth = require('../lib/auth');
const config = require('../../config');

const app = express();

// Add authentication
app.use(auth.authMiddleware(config.jwtSecrets.nominations));
app.use((auth.sessionMiddleware: any));

// Load the routess
app.use(require('./routes').router);

module.exports = app;
