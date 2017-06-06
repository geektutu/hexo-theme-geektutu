var config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.client.conf')


var port = config.dev.port
var proxyTable = config.dev.proxyTable

new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  historyApiFallback: {
    rewrites: [
      { from: /./, to: 'index.html' },
    ],
  },
  stats: {
    colors: true
  },
  proxy: proxyTable
}).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('listening in port: ', port)
});