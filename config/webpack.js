var path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, '../.webpack-out/views'), // TODO: change path
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
