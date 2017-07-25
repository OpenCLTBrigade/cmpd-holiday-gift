/*eslint no-console: "off"*/

var bodyParser = require('body-parser');
var fs = require('fs');
var morgan = require('morgan');
var compression = require('compression');
var { join } = require('path');
var express = require('express');

var config = require('../config');

var models = require('../models');
var nominations = require('./nominations');
var authApp = require('./auth');
var auth = require('./lib/auth');

var app = express();

// Log to file
if (config.enableAccessLog) {
  app.use(morgan('combined', { stream: fs.createWriteStream(join(config.run, 'access.log'), { flags: 'a' }) }));
}

// Log to stdout for development
if (config.verboseAccessLog) {
  app.use(morgan('dev'));
}

// Compress contents
if (config.useCompression) {
  app.use(compression());
}

// TODO: handle and log errors

app.use(bodyParser.json());

// Mount the apps
app.use('/nominations', nominations);
app.use('/auth', authApp);

// Expose compiled assets
app.use(express.static(join(__dirname, '../../build'), { index: false }));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../build/index.html'));
});

// Array of promises that must complete before starting the server
var initialize = [];

// Sync the database
initialize.push(models.sequelize.sync().then(function () {
  if (config.verbose) {
    console.log('Nice! Database sync succeeded.');
  }
}).catch(function (err) {
  console.log('Database sync failed:', err);
}));

// Prepare to compile the views and web assets

module.exports = Promise.all(initialize).then(() => app);
