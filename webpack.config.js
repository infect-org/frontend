const webpack = require('webpack');
const path = require('path');
const BeepPlugin = require('webpack-beep-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Don't use ExtractTextPlugin in dev mode as it does not support hot-reloading, 
// see https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-125757853
const debug = process.env.NODE_ENV === 'production' ? false : true;
const styles = 'css-loader!sass-loader';

module.exports = [

	// Main app
	{
		context: path.resolve(__dirname, 'www/src/')
		, entry:  {
			main: ['./js/main.js']
			, styles: ['./scss/main.scss']
		}
		, output: {
			path: path.resolve(__dirname, 'www/dist/')
			, publicPath: '/dist'
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
			  		//loader: debug ? `style-loader!${ styles }` : ExtractTextPlugin.extract(styles)
			  		loader: ExtractTextPlugin.extract(styles)
				}
			]
		}
		, resolve: {
			extensions: ['.js', '.jsx']
		}
		, plugins: [new ExtractTextPlugin({
						filename: '/css/main.min.css',
  						allChunks: false
					})
					, new BeepPlugin()]
	}
];