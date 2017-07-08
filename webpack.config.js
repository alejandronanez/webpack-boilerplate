const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development',
	allChunks: true
});

const SOURCE_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'dist');

module.exports = {
	entry: {
		bundle: path.join(SOURCE_PATH, 'index.js')
	},
	output: {
        path: BUILD_PATH,
		filename: '[name].js'
	},
	plugins: [
        extractSass
	],
    resolve: {
        modules: [
            'node_modules',
            path.join(SOURCE_PATH, '/scripts')
        ],
        alias: {
            // so we can do: import 'styles/path/to/foo.scss
            styles: path.join(SOURCE_PATH, '/styles')
        }
    },
	module: {
		rules: [
			{
				test: /\.js$/,
                // Speed up babel-node using cacheDirectory
                // See: https://github.com/babel/babel-loader#babel-loader-is-slow
				use: 'babel-loader?cacheDirectory=true',
				exclude: /node_modules/
			},
			{
		        test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
		    },
			{
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=application/font-woff'
            },
			{
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=application/octet-stream'
            },
			{
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file'
            },
			{
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=image/svg+xml'
            }
		]
	},
	devtool: 'inline-source-map'
}
