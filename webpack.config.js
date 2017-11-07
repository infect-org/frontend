const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveWebpackPlugin = require('remove-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


// Pass in env as --env.dev or --env.production
module.exports = function(env) {

	// Don't use ExtractTextPlugin in dev mode as it does not support hot-reloading, 
	// see https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-125757853
	const debug = env && env.dev === true;
	console.log('Debug Mode?', !!debug);
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

	// style-loader ensures style live reloading – but only works if we're not using ExtractTextPlugin. 
	if (debug) {
		styles.unshift({
			loader: 'style-loader'
		});
	}
	console.log('Styles:', styles);


	// Only add hashes in live mode. webpack-dev-server loads files from
	// memory, they don't contain hashes
	const hash = debug ? '' : '.[chunkhash]';
	console.log('Hash is', hash);


	const plugins = [
		new ExtractTextPlugin({
			filename: `css/[name]${ hash }.css`
			, allChunks: true
		})
	];
	if (!debug) {
		plugins.push(new UglifyJSPlugin({
			sourceMap: true
		}));
	}
	plugins.push(new HtmlWebpackPlugin({
		template: '../index.ejs'
		, filename: '../index.html'
		, inject: false
		, isDebug: debug
		, alwaysWriteToDisk: true
		, outputPath: path.resolve(__dirname, 'www')
	}));
	plugins.push(new RemoveWebpackPlugin(['www/dist/js', 'www/dist/css', 'www/index.html']));
	plugins.push(new HtmlWebpackHarddiskPlugin());
	console.log('Plugins', plugins);



	return {
		context: path.resolve(__dirname, 'www/src/')
		, entry:  {
			main: [
				'./js/main.js'
				, './scss/main.scss'
			]
		}
		, output: {
			path: path.resolve(__dirname, 'www/dist/')
			, publicPath: '/dist'
			, filename: `js/[name]${ hash }.js`
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
				}, {
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
		, plugins: plugins
	};

};