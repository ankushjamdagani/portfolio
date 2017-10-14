var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname + 'src/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
	entry: './src/index.js',
	output: {
		path: BUILD_DIR,
		publicPath: '/dist',
		filename: 'bundle.js'
	},
	resolve: {
    	extensions: ['.js', '.jsx']
  	},
	module: {
		loaders: [
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{ 
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
		        query: {
		          presets: ['react', 'es2015', 'stage-3']
		        }
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
				loader: 'file-loader'
			}
		]
	}
}