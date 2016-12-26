var webpack = require('webpack');

var fullOutputConfig = {
    output: {
        library: 'flow',
        libraryTarget: 'umd',
        path: './dist',
        filename: 'marionette.flow.js'
    },
    entry: {
        library: './marionette.flow'
    },
};

var minfiedOutputConfig = {
    output: {
        library: 'flow',
        libraryTarget: 'umd',
        path: './dist',
        filename: 'marionette.flow.min.js'
    },
    entry: {
        library: './marionette.flow'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: false,
            sourceMap: false,
        })
    ]
};

module.exports = [ fullOutputConfig, minfiedOutputConfig ];
