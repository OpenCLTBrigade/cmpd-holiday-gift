var path = require('path');
var mode = require('.').mode;

// TODO: when mode == production, minify/gzip/etc..

module.exports = {
    output: {
        path: path.join(__dirname, '../.webpack-out/views'),
        publicPath: '/views',
        filename: '[name].js',
        library: 'view_[name]'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }]
    },
};
