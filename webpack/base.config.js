const path = require('path');
const entry = require('./entry');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(process.cwd(), "src"), // 手动配置context上下文
  entry: entry,
  watch: true,
  devServer: {
    contentBase: path.join(process.cwd(), "sample"), // webpack之外的
    compress: true,
    port: 9000
  },
  output: {
    publicPath: '/dist', // 路由路径 所有资源放在 /dist
    path: path.resolve(process.cwd(), "dist"), // process.cwd() node的启动目录
    filename: "[name].js" // 必须指定
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"), // 使用插件 样式放css目录
    new HtmlWebpackPlugin({ // 生成html文件 
      title: 'sale',
      template: 'base/webpack.template.html',
      chunks: ['sale', 'list'], // 中间资源 对应 js css 为 sale list
      filename: 'sale.html'
    })
  ],
  module: {
    rules: [  // 编译规则
      {
        test: /\.js$/,
        loader: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 使用插件抽取css
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader",
        options: {
          name: 'assets/[name]_[sha512:hash:base64:7].[ext]' // 图片放assets目录
        }
      }
    ]
  }
}