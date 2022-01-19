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
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    module : {
        rules : [
            {
                test : /\.(tsx?)$/,
                exclude : /node_modules/,
                use : ['ts-loader']
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