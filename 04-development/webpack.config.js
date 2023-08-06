// 自定义webpack配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',

  output: {
    filename: "bundle.js",
    // 生成绝对路径
    path: path.resolve(__dirname, "dist"),
    // 清理dist
    clean: true
  },

  mode: 'development',
  devtool: 'inline-source-map', // 精准定位代码行数

  plugins: [
    // new HtmlWebpackPlugin()：生成的是默认在dist文件夹里的index.html
    // 自定义生成一个打包后的html文件
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: 'app.html',
      inject: 'body'
    })
  ],

  devServer: {
    // dist作为server的根目录
    static: './dist'
  }
};