'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules').
  filter(function(x) { return x !== '.bin' }).
    forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod; });
    
module.exports = {
  entry: path.join(__dirname, './app/server.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'build/server'),
    filename: 'server.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ [ 'es2015', { 'modules': false } ] ]
        }
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ],
  devtool: 'sourcemap'
};
