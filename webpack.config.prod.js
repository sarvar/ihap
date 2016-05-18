var webpack = require('webpack');
var path = require('path');

// plugins
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './js/index.js',
  devtool: false,
  output: {
    path: __dirname + '/dist/js',
    filename: 'ihap.min.js',
    library: 'ihap',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /(\.js)$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED'
      },
      concurrency: 1,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  ]
};
