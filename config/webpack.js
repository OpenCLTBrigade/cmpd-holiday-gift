var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var mode = require('.').mode;

var options = {
    entry: {load: ['./views/load.js']},
    output: {
        path: path.join(__dirname, '../.webpack-out/'),
        publicPath: '/v',
        filename: '[name].js'
    },
    plugins: [
    ],
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

if (mode == 'development') {
    options.devtool = 'eval';
    options.plugins.push(new webpack.HotModuleReplacementPlugin());
    options.entry.load.push('webpack-hot-middleware/client');
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
