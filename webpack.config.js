const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
    entry: {
        main: './demo/index.js',
    },
    output: {
        path: path.resolve('./www/static'),
        filename: 'js/demo.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    watchOptions: {
        aggregateTimeout: 200
    },
    resolve: {
        modules: ['node_modules', 'src', 'src/style'],
        extensions: ['.js', '.scss', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /react-live/],
                use: ['babel-loader']
            },
            {
                test: /\.(gif|png|ttf|svg|woff|eot)$/,
                exclude: [/node_modules/, /react-live/],
                use: ['file-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
            IS_BOY: JSON.stringify(false),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo/index.ejs',
            inject: 'body'
        })
    ]
}


module.exports = config