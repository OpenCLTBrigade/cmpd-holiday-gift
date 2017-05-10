/*eslint no-console: "off"*/

// TODO: use https and letsencrypt-express

var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-session-sequelize')(expressSession.Store);
var fs = require('fs');
var webpack = require('webpack');
var morgan = require('morgan');
var compression = require('compression');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var {join} = require('path');
var express = require('express');
var config = require('../config');
var webpackConfig = require('../config/webpack');

var models = require('../models');
var nominations = require('./nominations');

var app = express();

// Log to file
//app.use(morgan('combined', {stream: fs.createWriteStream(join(config.run, 'access.log'), {flags: 'a'})}));

// Log to stdout for development
if (config.verboseAccessLog) {
    app.use(morgan('dev'));
}

// Compress contents
if (config.useCompression) {
    app.use(compression());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enable persistent sessions
var sequelizeSessionStore = new SessionStore({db: models.sequelize});
app.use(cookieParser());
app.use(expressSession({
    secret: 'codeforCLT', // TODO: move secret to secrets file
    store: sequelizeSessionStore,
    resave: true,
    saveUninitialized: true
}));

// Mount the nominations app
app.use(nominations);

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
var compiler = webpack(webpackConfig);

if (!config.enableHotReload) {
    // In production mode, compile all assets once before starting the server
    if (config.buildAssets) {
        initialize.push(new Promise((success, fail) => compiler.run((err) => {
            if (err) {
                console.log('Webpack failed:', err);
                fail();
            } else {
                success();
            }
        })));
    }
} else {
    // In development mode, use hot reloading
    app.use(webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'minimal'
    }));
    app.use(webpackHotMiddleware(compiler));
}

module.exports = Promise.all(initialize).then(() => app);
