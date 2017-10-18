const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



// Pass in env as --env.dev or --env.production
module.exports = function(env) {

	// Don't use ExtractTextPlugin in dev mode as it does not support hot-reloading, 
	// see https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-125757853
	const debug = env && env.dev === true;
	console.log('Debug Mode?', debug);
	const styles = [
		 {
			loader: 'css-loader',
			options: {
				sourceMap:true
			}
		},
		{
			loader: 'sass-loader',
			options: {
				sourceMap: true
			}
		 }];

	// style-loader ensures style live reloading – but only works if we're not using ExtractTextPlugin. 
	if (debug) {
		styles.unshift({
			loader: 'style-loader'
		});
	}
	console.log('Styles:', styles);


	return {
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
					, use: 'babel-loader'
					, include: [
						  path.resolve(__dirname, 'www/src/js')
						, path.resolve(__dirname, 'node_modules/mobx')
					]
					/* query is taken from .babelrc */
				}, 
				{
					test: /\.scss$/,
					use: debug ? styles : ExtractTextPlugin.extract({
						use: styles
					})
				}
			]
		}
		, resolve: {
			extensions: ['.js', '.jsx']
		}
		, plugins: [new ExtractTextPlugin({
			filename: '/css/main.min.css'
		})]
	};

};