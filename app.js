/*eslint no-console: "off"*/

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var expressVue = require('express-vue');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-session-sequelize')(expressSession.Store);
var configurePassport = require('./config/passport.js');

var config = require('./config')();
var models = require('./models');

// An empty Express application
var app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('vue', {
    componentsDir: path.join(__dirname, 'views/components'),
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');

// Expose client-side dependencies
['jquery', 'bootstrap', 'express-vue'].forEach(lib => {
    app.use('/' + lib, express.static(path.join(__dirname, 'node_modules/' + lib), {index: false}));
});

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
            res.render(view, {data: data, vue: {head: {title: title}}});
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

// Start server
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
