const merge = require('webpack-merge');
const mainConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(mainConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.(js)$/
      })
    ]
  }
});
