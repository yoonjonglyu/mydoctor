const commonPaths = require('./common-paths');
const webpack = require('webpack');
const port = process.env.PORT || 38888;

const config = {
    mode : 'development',
    entry : {
        app : `${commonPaths.appEntry}/index.js`
    },
    output : {
        filename : '[name].[hash].js'
    },
    devtool : 'eval',
    module : {
        rules : [
            {
                test : /\.(png|jpe?g|git)$/,
                loader : 'file-loader',
                options : {
                    name : `[contenthash].[ext]`,
                }
            },
            {
                test : /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            modules : true,
                            sourceMap : true
                        }
                    }
                ]
            }
        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: { // 웹팩서버
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
        hot: true
      }
}

module.exports = config;