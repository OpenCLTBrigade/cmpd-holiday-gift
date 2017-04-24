var path = require('path');

var webpack = require('webpack');
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var mode = require('.').mode;

// TODO: when mode == production, minify, gzip, etc...

module.exports = {
    entry: {
        load: './views/load.js',
        jquery: 'jquery',
        vue: 'vue',
        'admin-lte': 'admin-lte',
        bootstrap: 'bootstrap'
    },
    output: {
        path: path.join(__dirname, '../.webpack-out/'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            children: true
        })
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.css$/,
            // loader: ['style-loader', 'css-loader']
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },{
            test: /\.(svg|ttf|jpg|eot|woff|woff2)$/,
            loader: 'file-loader'
        }]
    },
};
