const webpack = require('webpack');
const path = require('path');
const BeepPlugin = require('webpack-beep-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [

	// Main app
	{
		context: path.resolve(__dirname, 'www')
		, entry:  {
			home: ['./src/js/main.js']
			,styles: ['./styles/scss/main.scss']
		}
		, output: {
			path: path.resolve(__dirname, 'www/dist/')
			, publicPath: '/dist/js'
			, filename: 'js/[name].js'
		}
		, devtool: 'source-map'
		, devServer: {
			publicPath: '/dist/'
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
				}, 
				{
			  		test: /\.scss$/,
			  		loader: ExtractTextPlugin.extract('css-loader!sass-loader')
				}
			]
		}
		, resolve: {
			extensions: ['.js', '.jsx']
		}
		, plugins: [new ExtractTextPlugin(
						{filename: '/css/main.min.css',
      					allChunks: false
    				})
					, new BeepPlugin()]
	}
];