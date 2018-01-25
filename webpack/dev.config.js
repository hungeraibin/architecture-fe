const path = require('path');
const baseWebpackConfig = require('./base.config.js');
const devWebpackPartialConfig = {
  watch: true,
  devServer: {
    contentBase: path.join(process.cwd(), "sample"), // webpack之外的
    compress: true,
    port: 9000
  },
};

module.exports = Object.assign({},
  baseWebpackConfig,
  devWebpackPartialConfig)