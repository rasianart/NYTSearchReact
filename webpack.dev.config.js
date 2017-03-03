let webpack = require('webpack');
let webpackStats = require('stats-webpack-plugin');
let HTMLWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    devtool: '#source-map',
    entry: [
        'whatwg-fetch',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        __dirname + '/public/index.js'
    ],
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/js/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [HTMLWebpackPluginConfig,
              new webpack.HotModuleReplacementPlugin(),
              new webpackStats
            //   "fetch"
            ],
    target: 'web'
};
