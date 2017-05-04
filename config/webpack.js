var path = require('path');
var glob = require('glob');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var {enableHotReload} = require('.');

var views = {};
glob.sync(__dirname +  '/../apps/*/views').forEach(path => {
    views[path.match(/apps\/(.*?)\/views/)[1]] = path;
});

var options = {
    entry: views,
    output: {
        path: path.join(__dirname, '../run/webpack'),
        publicPath: '/v',
        filename: '[name].js'
    },
    plugins: [],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(svg|ttf|jpg|eot|woff|woff2)$/,
            loader: 'file-loader'
        }]
    },
};

if (enableHotReload) {
    options.devtool = 'eval';
    options.plugins.push(new webpack.HotModuleReplacementPlugin());
    options.entry['devel'] = 'webpack-hot-middleware/client';
    options.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    });
} else {
    options.devtool = 'source-map';
    options.plugins.push(new ExtractTextPlugin('style.css'));
    options.module.rules.push({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({use: 'css-loader'})
    });
}

module.exports = options;
