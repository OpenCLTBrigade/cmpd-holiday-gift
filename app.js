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

// Each compiled view is assigned to a javascript variable by webpack
// For example, `view/login.vue` is placed in `view_login`
function viewPathToVar(path) {
    return path.replace(/^\/|\.vue$/g, '').replace(/[\/-]/g, '_');
}

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
    var path = filePath.slice(viewDir.length);
    var view = viewPathToVar(path);

    // Fill in the blanks from `skeleton.html`
    var out = skeleton().replace(/\{\{\{([^}]*)\}\}\}/g, function (match, name) {
        if (name == 'head') {
            if (options.title) {
                return `<title>${options.title}</title>`;
            }
            return '';
        } else if (name == 'body') {
            // Add a script that loads and renders the template
            return `
                <div id="view"></div>
                <script src="/views/${view}.js"></script>
                <script>
                  var View = Vue.extend(view_${view});
                  new View({
                      el: '#view',
                      propsData: ${JSON.stringify(options.data)}
                  });
                </script>`;
        }
    });
    callback(null, out);
});

app.set('view engine', 'vue');

// Expose client-side dependencies and static assets
// TODO: use webpack instead
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
//  - otherwise render the view using `res.render`
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

// Sync the database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine');
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!');
});

// Generate the assets
// TODO: use vuejs hot reload

// List all available vues
var allViews = {};
glob.sync('views/**/*.vue').forEach(function (path) {
    allViews[viewPathToVar(path.replace('views/', ''))] = './' + path;
});

// Compile each view
// In development mode, watch for changes and automatically recompile
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
