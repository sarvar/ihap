var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './js/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/src',
    filename: 'ihap.js',
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
  plugins: []
};
