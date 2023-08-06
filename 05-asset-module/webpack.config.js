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
    clean: true,
    // asset modules打包后的名
    assetModuleFilename: 'images/[contenthash][ext]',
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
  },

  // asset modules
  module: {
    rules: [
      // 加载asset/resource模块文件
      {
        test: /\.jpg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]'
        }
      },
      // 加载asset/inline模块文件
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      // 加载asset/source模块文件
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      // 加载asset模块文件，在resource和inline之间做选择
      {
        test: /\.png$/,
        type: 'asset',
        // 加载的资源大于8K，就会创建一个资源；小于8K就生成一个base64的链接。通过下方修改临界值
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024 // 4MB
          }
        }
      },
    ]
  }
};