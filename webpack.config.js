var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var lib_name = 'AudioPlayer';
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var outputFile = debug ? 'audioplayer.js' : 'audioplayer.min.js';

var config = {
  entry: __dirname + '/src/js/index.js',
  devtool: debug ? 'source-map' : false,
  output: {
    path: __dirname + '/dist/js',
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
    //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ClosureCompilerPlugin({
          compiler: {
            language_in: 'ECMASCRIPT6',
            language_out: 'ECMASCRIPT5',
            compilation_level: 'ADVANCED'
          },
          concurrency: 1,
    })
  ]
};

module.exports = config;
