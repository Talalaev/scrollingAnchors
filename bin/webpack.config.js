const webpack = require('webpack');

module.exports = {
    entry: "../src/ScrollingAnchors/index.js",
    output: {
        path: __dirname,
        filename: "../src/bundle.js",
		library: "ScrollingAnchors"
    },
	
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	],
	
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel'
		}]
	}
	
};