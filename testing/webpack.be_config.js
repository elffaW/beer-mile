'use strict';

var path = require('path');
    
module.exports = {
  entry: path.join(__dirname, './server.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'build/server'),
    filename: 'server_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/,/src\/ignore/],
        loader: 'babel',
        query: {
          presets: ['es2015']
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ]
};
