const webpack = require('webpack');
const path = require('path');
const walk = require('walk-sync');
const TapWebpackPlugin = require('tap-webpack-plugin');

const basePath = 'www/src/js';
const entries = walk('.')
	.filter((name) => /\.(unit|integration)\.js$/.test(name))
	.map((name) => name.substr(basePath.length + 1))
	.map((name) => './' + name);
console.log('Test', entries.length, 'files.');

module.exports = [

	// Tests
	{
		context: path.resolve(__dirname, basePath)
		, target: 'node'
		/* pass in entry manually */
		, entry: entries
		, output: {
			path: path.resolve(__dirname, 'www/dist/')
			, filename: 'test.js'
		}
		, watch: true
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
    		new TapWebpackPlugin({ reporter: 'node ./node_modules/tap-spec/bin/cmd' })
    	]

	}

];