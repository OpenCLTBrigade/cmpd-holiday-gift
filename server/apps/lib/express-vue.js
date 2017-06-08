// Vue templates for express
//
// Depends on the proper configuration of webpack

var {join} = require('path');
var fs = require('fs');

var {enableHotReload} = require('../../config');

function engine(viewDir) {

    // The skeleton is a raw HTML file with two elements that get replaced:
    // * {{{head}}} -- The title gets placed here
    // * {{{body}}} -- The view's template gets rendered here
    var skeleton = () =>
        fs.readFileSync(join(viewDir, 'skeleton.html')).toString();

    // In production mode, do not reload skeleton.html every request
    if (!enableHotReload) {
        var skeletonContents = skeleton();
        skeleton = () => skeletonContents;
    }

    // res.render(view_name, options): a custom rendering engine using Vue and Webpack
    // Don't use this directly: use res.renderData instead
    // * options.title: the page title
    // * options.data: input data for the view, passed as JSON into the view's props
    return function (filePath, options, callback) {
        if (filePath.slice(0, viewDir.length) !== viewDir) {
            return callback('Could not load view from outside view dir: ' + filePath);
        }
        // Don't open the `.vue` file, just use the filename to identify
        // where webpack has placed it
        var viewName = filePath.slice(viewDir.length + 1).replace(/\.vue$/, '');

        // Fill in the blanks from `skeleton.html`
        var out = skeleton().replace(/\{\{\{([^}]*)\}\}\}/g, function (match, name) {
            if (name === 'head') {
                if (options.title) {
                    return `<title>${options.title}</title>`;
                }
                return '';
            } else if (name === 'body') {
                // Add a script that loads and renders the template
                return `<script>loadView('${viewName}', ${JSON.stringify(options.data)});</script>`;
            }
        });
        callback(null, out);
    };
}

// res.renderData(view, title, data)
//  - if the url ends with '.json', return data as JSON
//  - if 'Accepts: application/json', return data as JSON
//  - otherwise render the view using `res.render`
function jsonMiddleware(req, res, next) {
    if (req.url.match(/\/v/)) {
        return next();
    }
    if (req.accepts(['html', 'json']) === 'json') {
        req.wantsJSON = true;
    }
    if (req.url.slice(-5) === '.json') {
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
}

module.exports = {engine, jsonMiddleware};
