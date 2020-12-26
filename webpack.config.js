const isProduction = process.env.NODE_ENV === 'production';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackUserscript = require('webpack-userscript')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: isProduction ? false : 'eval-source-map',

    performance: isProduction ? {
        hints: false,
        maxEntrypointSize: 0,
        maxAssetSize: 0
    } : {},

    entry: './src/index.js',
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/i, 
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg)$/i, 
                loader: 'url-loader',
                options: {
                    esModule: false
                },
            }
        ]
    },
    plugins: [
        new WebpackUserscript({
            headers: path.join(__dirname, './headers.json'),
            pretty: isProduction,
        }),
        new HtmlWebpackPlugin({
            template: './public/test.html',
            hash: true,
            minify: isProduction,
            proxyScript: {
                baseUrl: 'http://localhost:8080',
                filename: '[basename].proxy.user.js',
                enable: () => !isProduction
            }
        }),
    ],
    
    devServer: {
        // host: '0.0.0.0',
        // port: 9000,
        open: true,
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),

        disableHostCheck: true,
        // writeToDisk: false
    },

    output: {
        filename: 'bundle.user.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/'
    },
};