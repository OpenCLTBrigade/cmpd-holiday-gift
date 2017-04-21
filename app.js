/*eslint no-console: "off"*/

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-session-sequelize')(expressSession.Store);
var fs = require('fs');
var webpack = require('webpack');
var glob = require('glob');

var configurePassport = require('./config/passport.js');
var config = require('./config');
var webpackConfig = require('./config/webpack');
var models = require('./models');

// An empty Express application
var app = express();

// A custom view rendering engine that uses Vue and Webpack

var skeleton = () =>
    fs.readFileSync(path.join(__dirname, 'views/skeleton.html')).toString();

if (config.mode == 'production') {
    var skeletonContents = skeleton();
    skeleton = () => skeletonContents;
}

var viewDir = path.join(__dirname, 'views');

function viewPathToVar(path) {
    return path.replace(/^\/|\.vue$/g, '').replace(/[\/-]/g, '_');
}

app.set('views', viewDir);

app.engine('vue', function (filePath, options, callback) {
    if (filePath.slice(0, viewDir.length) != viewDir) {
        return callback('Could not load view from outside view dir: ' + filePath);
    }
    var path = filePath.slice(viewDir.length);
    var view = viewPathToVar(path);
    var out = skeleton().replace(/\{\{\{([^}]*)\}\}\}/g, function (match, name) {
        if (name == 'head') {
            if (options.title) {
                return `<title>${options.title}</title>`;
            }
            return '';
        } else if (name == 'body') {
            return `
                <div id="view"></div>
                <script src="views/${view}.js"></script>
                <script>
                  view_${view}.data = function(){ return ${JSON.stringify(options.data)}; };
                  new Vue({
                    el: '#view',
                    render: function (h) { return h(view_${view}); }
                  });
                </script>`;
        }
    });
    callback(null, out);
});

app.set('view engine', 'vue');

// Expose client-side dependencies and static assets
['jquery', 'bootstrap', 'vue', 'admin-lte', 'font-awesome'].forEach(lib => {
    app.use('/' + lib, express.static(path.join(__dirname, 'node_modules/' + lib), {index: false}));
});

app.use(express.static(path.join(__dirname, 'assets'), {index: false}));
app.use(express.static(path.join(__dirname, '.webpack-out'), {index: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// res.renderData(view, title, data)
//  - if the url ends with '.json', return data as JSON
//  - if 'Accepts: application/json', return data as JSON
//  - otherwise render the data using the view and title
app.use(function (req, res, next) {
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

// Sessions
var sequelizeSessionStore = new SessionStore({db: models.sequelize});
app.use(cookieParser());
app.use(expressSession({
    secret: 'codeforCLT', // TODO: move secret to secrets file
    store: sequelizeSessionStore,
    resave: true,
    saveUninitialized: true
}));

// Authentication
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport, models.user);

// Routes
app.use(require('./routes'));

// Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine');
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!');
});

// Generate assets
// TODO: use vuejs hot reload
var allViews = {};
glob.sync('views/**/*.vue').forEach(function (path) {
    allViews[viewPathToVar(path.replace('views/', ''))] = './' + path;
});
var compiler = webpack(Object.assign({}, webpackConfig, {entry: allViews}));
var build = (cb) => (config.mode == 'development' ? compiler.watch({}, cb) : compiler.run(cb));
build((err, stats) => {
    if (err) {
        console.log('Webpack failed:', err);
    } else {
        console.log('Webpack succeeded:\n', stats.toString({
            colors: true,
            chunks: false
        }));
    }
});

// TODO: wait for database sync and webpack done before starting server

// Start server
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

