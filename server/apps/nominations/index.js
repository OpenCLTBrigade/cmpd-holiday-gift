var express = require('express');
var {join} = require('path');

var app = express();

// Load the routess
app.use(require('./routes'));

module.exports = app;
