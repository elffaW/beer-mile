'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });
    
module.exports = {
  entry: path.join(__dirname, './server.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'build/server'),
    filename: 'server.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/,/app\/ignore/],
        loader: 'babel-loader',
        query: {
          presets: [ ['es2015', { 'modules': false } ] ]
        }
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ],
  devtool: 'sourcemap'
};
