// 自定义webpack配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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

  mode: 'development', // development
  devtool: 'inline-source-map', // 精准定位代码行数

  plugins: [
    // new HtmlWebpackPlugin()：生成的是默认在dist文件夹里的index.html
    // 自定义生成一个打包后的html文件，且自动引入打包后的js和css文件
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: 'app.html',
      inject: 'body'
    }),
    // 抽离css文件，打包到一个单独的css文件，通过link引入css文件
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
  ],

  devServer: {
    // dist作为server的根目录
    static: './dist'
  },

  // asset modules（webpack内置的） 和 loader
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
      /**
       * 加载css：
       * css-loader可以让css文件作为模块引入js文件中，并在应用程序中使用它们
       * style-loader将其应用到页面上，放在head里面的style标签内
       * less-loader将less文件转换为css文件，将Less文件打包成一个或多个输出的CSS文件。
       */
      {
        test: /\.(css|less)$/,
        // 顺序是从后往前执行，webpack支持loader的链式调用 
        // use: ['style-loader', 'css-loader', 'less-loader'],
        // MiniCssExtractPlugin.loader 压缩CSS，通过link引入css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // 加载自定义字体包
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      // csv转换为数组
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      // xml会转换成js对象
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },

  optimization: {
    minimizer: [
      // 压缩所有的css代码
      new CssMinimizerPlugin()
    ]
  }
};