const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry : {
    },
    output : {
        path : commonPaths.outputPath,
        publicPath : '/'
    },
    module : {
        rules : [
            {
                test : /\.(js)$/,
                exclude : /node_modules/,
                use : ['babel-loader']
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : 'public/index.html',
            //favicon : 'public/favicon.ico'
        }),
    ]
}

module.exports = config;