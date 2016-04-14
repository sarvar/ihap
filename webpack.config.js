var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var lib_name = 'AudioPlayer';

var outputFile = debug ? 'audioplayer.js' : 'audioplayer.min.js';

var config = {
  entry: __dirname + '/src/js/index.js',
  devtool: debug ? 'source-map' : false,
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: lib_name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
	},
	plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
	  ]
};

module.exports = config;
