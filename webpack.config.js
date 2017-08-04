import path from 'path';
import webpack from 'webpack';
export default {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src', 'index.jsx')
    ],
    output: {
        path: path.join(__dirname, 'dest'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    }
}