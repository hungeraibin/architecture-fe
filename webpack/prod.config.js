const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackPlugin =require('./base.config.js');
const plugins = baseWebpackPlugin.plugins;
const newPlugins = plugins.concat([new UglifyJsPlugin()]);

module.exports = Object.assign({}, 
  baseWebpackPlugin,
  {
    plugins: newPlugins,
  });