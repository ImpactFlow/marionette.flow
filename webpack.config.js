var webpack = require('webpack');

var fullOutputConfig = {
    output: {
        library: 'Flow',
        libraryTarget: 'umd',
        path: './dist',
        filename: 'marionette.flow.js'
    },
    entry: {
        library: './marionette.flow'
    },
    externals: [
        {
            'backbone.marionette': {
                root: 'Marionette',
                commonjs2: 'backbone.marionette',
                commonjs: 'backbone.marionette',
                amd: 'backbone.marionette',
            }
        }
    ],
};

var minfiedOutputConfig = {
    output: {
        library: 'Flow',
        libraryTarget: 'umd',
        path: './dist',
        filename: 'marionette.flow.min.js'
    },
    entry: {
        library: './marionette.flow'
    },
    externals: [
        {
            'backbone.marionette': {
                root: 'Marionette',
                commonjs2: 'backbone.marionette',
                commonjs: 'backbone.marionette',
                amd: 'backbone.marionette',
            }
        }
    ],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: false,
            sourceMap: false,
        })
    ]
};

module.exports = [ fullOutputConfig, minfiedOutputConfig ];
