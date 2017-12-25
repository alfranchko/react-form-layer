const webpack = require('webpack')
const path = require('path')


const config = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve('./lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
        //libraryExport: 'default',
        library: 'react-form-Layer'
    },
    devtool: false,
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /react-live/],
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    warnings: false,
        //    drop_console: true,
        //    unsafe: false,
        //    sourceMap: false,
        //    comments: false,
        //    compress: {
        //        warnings: false,
        //        drop_console: true,
        //        drop_debugger: true,
        //        dead_code: true
        //    }
        //})
    ]
}


module.exports = config