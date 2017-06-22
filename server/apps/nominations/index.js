var express = require('express');

var app = express();

// Load the routess
app.use(require('./routes'));

module.exports = app;
