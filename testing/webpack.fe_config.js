'use strict';

var path = require('path');
    
module.exports = {
  entry: path.join(__dirname, './web/BeerMile.js'),
  output: {
    path: path.join(__dirname, 'build/client'),
    filename: 'beermile.min.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules','web']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/,/src\/ignore/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'file' },
      { test: /\.ttf$/, loader: 'file' },
      { test: /\.woff$/, loader: 'url?limit=100000' },
      { test: /\.woff2$/, loader: 'url?limit=100000' },
      { test: /\.png$/, loader: 'file' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ]
};
