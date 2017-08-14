const webpack = require('webpack');
const path = require('path');
const BeepPlugin = require('webpack-beep-plugin');

module.exports = [

	// Main app
	{
		context: path.resolve(__dirname, 'www/src/js')
		, entry:  [
			'./main.js'
		]
		, output: {
			path: path.resolve(__dirname, 'www/dist/js/')
			, publicPath: '/dist/js/'
			, filename: 'main.js'
		}
		, devtool: 'source-map'
		, devServer: {
			publicPath: '/dist/js/'
			, contentBase: 'www'
			, hot: true
		}
		, module: {
			loaders: [
				{
					test: /\.jsx?$/
					, loader: 'babel-loader'
					, include: [
						  path.resolve(__dirname, 'www/src/js')
						, path.resolve(__dirname, 'node_modules/mobx')
					]
					/* query is taken from .babelrc */
				}
			]
		}
		, resolve: {
			extensions: ['.js', '.jsx']
		}
		, plugins: [new BeepPlugin()]
	}
];