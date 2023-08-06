## webpack

#### 一、解决的问题：帮我们提高开发效率，比如有热更新，实时更新，帮助我们打包 javaScript 应用程序，并且同时支持 es 的模块化以及 commonjs；支持打包静态资源，比如图片、字体文件、样式文件等。

#### 存在的问题：webpack 只能理解 js 或 json 的文件，其他类型的需要 loader 或者 asset modules 去帮忙支持

- 1、es 的模块化：

```js
// math.js
const add = (x,y) => x + y;
export const add;

import { add } from "./math.js";
console.log(add(4,5));
```

- 2、commonjs 模块化：

```js
// math.js
const add = (x, y) => x + y;
module.exports = {
  add,
};

const math = require('./math.js');
console.log(math.add(4, 5));
```

#### 二、安装与运行

- 1、局部安装

```bash
npm i webpack webpack-cli --save-dev
```

- 2、运行

```bash
npx webpack
npx webpack --watch // 自动检测代码的变化
npx webpack-dev-server // 开启服务热更新
npx webpack-dev-server --open // 开启服务热更新，并自动打开浏览器
```

#### 三、plugins：webpack 编译器经过加工后会生成 js 或 css 文件，webpack 编译的过程需要借助一些工具来帮忙，这些工具可以帮助 webpack 来执行一些特定的任务，如：打包优化、资源管理等。

#### 四、loader：转换某些类型的模块。如：css 的使用需要使用 loader 加载器

#### 五、自定义 webpack 配置

```js
// 自定义webpack配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    // 生成绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 清理dist
    clean: true,
  },

  mode: 'none',

  /**
   * HtmlWebpackPlugin：解决了每次编译后都要手动引入bundle.js去index.html中的问题，它可以在每次编译自动生成一个index.html文件并且自动引入bundle.js
   */
  plugins: [
    // new HtmlWebpackPlugin()：生成的是默认在dist文件夹里的index.html
    // 自定义生成一个打包后的html文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body',
    }),
  ],

  /**
   * webpack-dev-server：提供了一个基本的 web server，具有实时重新加载的功能，实现浏览器刷新。
   */
  devServer: {
    // dist作为server的根目录
    static: './dist',
  },
};
```

#### 六、利用资源模块加载非 js 文件

- 使用内置的资源模块(asset modules)来引入任何的其他类型资源，它允许我们利用 webpack 来打包其他的资源文件，比如字体文件，图标文件，图片等等。可以替换所有的 loader

- asset/resource：发送一个单独的文件并导出 URL，资源文件会打包到 dist 下。asset/resource 可以加载任何文件类型
- asset/inline：导出一个资源的 Data Base64 URL，比如把 svg 文件导出为 base64 文件
- asset/source：导出资源的源代码
- asset：在 resource 和 inline 之间做选择，在导出一个 Data Base64 URL 和发送一个单独的文件之间自动进行选择

```js
// asset modules：test属性识别出哪些文件被转换
module: {
  rules: [
    // 加载asset/resource模块文件
    {
      test: /\.jpg$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[contenthash][ext]',
      },
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
          maxSize: 4 * 1024 * 1024, // 4MB
        },
      },
    },
  ];
}
```

#### 六、Loader：让 webpack 去解析其他的类型的文件，并且将这些文件转化为有效的模块，以供应用程序使用。

- 加载 css：css-loader style-Loader
- 加载 less：less-loader css-loader style-loader
- 抽离 css：MiniCssExtractPlugin
- 压缩 css：CssMinimizerPlugin
- 加载 images 图像：asset/resource
- 加载 fonts 字体：asset/resource
- 加载数据：csv-loader、xml-loader

```js
// 自定义webpack配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    // 生成绝对路径
    path: path.resolve(__dirname, 'dist'),
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
      template: './index.html',
      filename: 'app.html',
      inject: 'body',
    }),
    // 抽离css文件，打包到一个单独的css文件，通过link引入css文件
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
    }),
  ],

  devServer: {
    // dist作为server的根目录
    static: './dist',
  },

  // asset modules（webpack内置的） 和 loader
  module: {
    rules: [
      // 加载asset/resource模块文件
      {
        test: /\.jpg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]',
        },
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
            maxSize: 4 * 1024 * 1024, // 4MB
          },
        },
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
        type: 'asset/resource',
      },
      // csv转换为数组
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      // xml会转换成js对象
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },

  optimization: {
    minimizer: [
      // 压缩所有的css代码
      new CssMinimizerPlugin(),
    ],
  },
};
```

### FAQ：plugins 与 loader 的区别
