var merge = require('webpack-merge')
var webpack = require('webpack');
var config = require('./webpack.base.conf');
var path = require('path')
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(config, {
  entry: {
    server: path.resolve(__dirname, '../server/main.js')
  },
  externals: nodeModules,
  output: {
    path: resolve('dist'),
    filename: 'server.js',
    publicPath: resolve('dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [resolve('app/style')],
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[local]_[hash:base64:3]',
      }, {
        test: /\.css$/,
        include: [resolve('app/style')],
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})