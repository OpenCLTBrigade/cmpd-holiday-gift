/*eslint no-console: "off"*/

// TODO: use https and letsencrypt-express

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-session-sequelize')(expressSession.Store);
var fs = require('fs');
var webpack = require('webpack');
var morgan = require('morgan');
var compression = require('compression');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var configurePassport = require('./config/passport.js');
var config = require('./config');
var webpackConfig = require('./config/webpack');
var models = require('./models');

// Start with an empty Express application
var app = express();

// The skeleton is a raw HTML file with two elements that get replaced:
// * {{{head}}} -- The title gets placed here
// * {{{body}}} -- The view's template gets rendered here
var skeleton = () =>
    fs.readFileSync(path.join(__dirname, 'views/skeleton.html')).toString();

// In production mode, do not reload skeleton.html every request
if (config.mode == 'production') {
    var skeletonContents = skeleton();
    skeleton = () => skeletonContents;
}

var viewDir = path.join(__dirname, 'views');

app.set('views', viewDir);

// res.render(view_name, options): a custom rendering engine using Vue and Webpack
// Don't use this directly: use res.renderData instead
// * options.title: the page title
// * options.data: input data for the view, passed as JSON into the view's props
app.engine('vue', function (filePath, options, callback) {
    if (filePath.slice(0, viewDir.length) != viewDir) {
        return callback('Could not load view from outside view dir: ' + filePath);
    }
    // Don't open the `.vue` file, just use the filename to identify
    // where webpack has placed it
    var viewName = filePath.slice(viewDir.length + 1).replace(/\.vue$/, '');

    // Fill in the blanks from `skeleton.html`
    var out = skeleton().replace(/\{\{\{([^}]*)\}\}\}/g, function (match, name) {
        if (name == 'head') {
            if (options.title) {
                return `<title>${options.title}</title>`;
            }
            return '';
        } else if (name == 'body') {
            // Add a script that loads and renders the template
            return `<script>loadView('${viewName}', ${JSON.stringify(options.data)});</script>`;
        }
    });
    callback(null, out);
});

app.set('view engine', 'vue');

// Log to file
app.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})}));

// Log to stdout for development
if (config.verboseAccessLog) {
    app.use(morgan('dev'));
}

// Compress contents
if (config.mode == 'development') {
    app.use(compression());
} else {
    // TODO: use compressing reverse-proxy in production
}

app.use(express.static(path.join(__dirname, 'assets'), {index: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// res.renderData(view, title, data)
//  - if the url ends with '.json', return data as JSON
//  - if 'Accepts: application/json', return data as JSON
//  - otherwise render the view using `res.render`
app.use(function (req, res, next) {
    if (req.url.match(/\/v/)) {
        return next();
    }
    if (req.accepts(['html', 'json']) == 'json') {
        req.wantsJSON = true;
    }
    if (req.url.slice(-5) == '.json') {
        req.wantsJSON = true;
        req.url = req.url.slice(0, -5);
    }
    res.renderData = function (view, title, data) {
        if (req.wantsJSON) {
            res.json(data);
        } else {
            res.render(view, {
                data: data,
                title: title
            });
        }
    };
    return next();
});

// Enable persistent sessions
var sequelizeSessionStore = new SessionStore({db: models.sequelize});
app.use(cookieParser());
app.use(expressSession({
    secret: 'codeforCLT', // TODO: move secret to secrets file
    store: sequelizeSessionStore,
    resave: true,
    saveUninitialized: true
}));

// Add authentication
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport, models.user);

// Load the routess
app.use(require('./routes'));

// Array of promises that must complete before starting the server
var initialize = [];

// Sync the database
initialize.push(models.sequelize.sync().then(function () {
    console.log('Nice! Database sync succeeded.');
}).catch(function (err) {
    console.log('Database sync failed:', err);
}));

// Generate the assets

// Prepare to compile the views and web assets
var compiler = webpack(webpackConfig);

if (config.mode == 'production') {
    // In production mode, compile all assets once before starting the server
    initialize.push(new Promise((success, fail) => compiler.run((err) => {
        if (err) {
            console.log('Webpack failed:', err);
            fail();
        } else {
            success();
        }
    })));
} else {
    // In development mode, use hot reloading
    app.use(webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'minimal'
    }));
    app.use(webpackHotMiddleware(compiler));
}

// Start server after initialization completes
Promise.all(initialize).then(function () {
    app.listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
    });
});
