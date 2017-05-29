const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    app: [
      // 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:3133',
      // 'webpack/hot/only-dev-server',
      './app/main'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build/static/js'),
    filename: '[name].js',
    publicPath: '/build'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]' },
      { test: /\.woff2?$/, loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'}),
    new webpack.HotModuleReplacementPlugin(), //热更新
    new webpack.NamedModulesPlugin(), //在控制台打印模块
  ],
  devtool: 'eval'
};

module.exports = config;