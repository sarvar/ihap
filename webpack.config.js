var webpack = require('webpack');
var path = require('path');
var lib_name = 'AudioPlayer';

var plugins = [], outputFile;
outputFile = 'audioplayer.js';

var config = {
  entry: __dirname + '/src/js/index.js',
  devtool: 'source-map',
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
  plugins: plugins
};

module.exports = config;
