var express = require('express');
var {join} = require('path');

var expressVue = require('../lib/express-vue.js');

var app = express();

// Set render engine to Vue
app.set('views', join(__dirname, 'views'));
app.engine('vue', expressVue.engine(app.get('views')));
app.set('view engine', 'vue');

// Expose assets
app.use(express.static(join(__dirname, 'assets'), {index: false}));

// Use JSON middleware to expose vue data
app.use(expressVue.jsonMiddleware);

// Load the routess
app.use(require('./routes'));

module.exports = app;
