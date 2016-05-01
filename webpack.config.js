var dev = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

// plugins
var ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
  entry: __dirname + '/src/js/index.js',
  devtool: dev ? 'source-map' : false,
  output: {
    path: __dirname + '/dist/js',
    filename: dev ? 'ihap.js' : 'ihap.min.js',
    library: 'ihap',
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
	plugins: dev ? [] : [
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
