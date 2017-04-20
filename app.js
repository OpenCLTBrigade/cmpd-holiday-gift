/*eslint no-console: "off"*/

// Module dependencies
var express = require('express');
var path = require('path');
var config = require('./config')();
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var expressVue = require('express-vue');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-session-sequelize')(expressSession.Store);

//Models
var models = require('./models');

var app = express();

// Configure views
app.set('views', path.join(__dirname, 'views'));
app.set('vue', {
    componentsDir: path.join(__dirname, 'views/components'),
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');

// Use middleware
['jquery', 'bootstrap', 'express-vue'].forEach(lib => {
    app.use('/' + lib, express.static(path.join(__dirname, 'node_modules/' + lib), {index: false}));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Add res.renderData, which returns HTML or JSON depending on context
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

// Sessions and Authentication
var sequelizeSessionStore = new SessionStore({db: models.sequelize});
app.use(cookieParser());
app.use(expressSession({
    secret: 'codeforCLT',
    store: sequelizeSessionStore,
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use(require('./routes'));

//load passport strategies
require('./config/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine');
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!');
});

// Start server
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
