'use strict';

var path = require('path');
var webpack = require('webpack');
    
module.exports = {
  entry: path.join(__dirname, './app/BeerMile.js'),
  output: {
    path: path.join(__dirname, 'build/client'),
    filename: 'beermile.min.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules','app', __dirname]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: [ ['es2015', { 'modules': false } ], 'react', 'stage-1' ]
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.woff$/, loader: 'url-loader?limit=100000' },
      { test: /\.woff2$/, loader: 'url-loader?limit=100000' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.ico$/, loader: 'url-loader?limit=100000' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ]
};
