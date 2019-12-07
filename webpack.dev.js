const path = require('path');
const merge = require('webpack-merge');
const mainConfig = require('./webpack.config.js');

module.exports = merge(mainConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
});
