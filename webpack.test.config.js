const webpack = require('webpack');
const path = require('path');
const TapWebpackPlugin = require('tap-webpack-plugin');

module.exports = [

	// Tests
	{
		context: path.resolve(__dirname, 'www/src/js')
		, target: 'node'
		/* pass in entry manually */
		, output: {
			path: path.resolve(__dirname, 'www/dist/js')
			, filename: 'test.js'
		}
		, module: {

			loaders: [
				{
					test: /\.jsx?$/
					, loader: 'babel-loader'
					, exclude: /node_modules/
				}
			]
		}
		, resolve: {
			extensions: ['.js', '.jsx']
		}
    	, plugins: [
    		new TapWebpackPlugin({ reporter: 'tap-spec' })
    	]

	}

];