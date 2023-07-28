## webpack

#### 一、解决的问题：帮我们提高开发效率，比如有热更新，实时更新，帮助我们打包 javaScript 应用程序，并且同时支持 es 的模块化以及 commonjs；支持打包静态资源，比如图片、字体文件、样式文件等。

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

### 二、安装与运行

- 1、局部安装

```bash
npm i webpack webpack-cli --save-dev
```

- 2、运行

```bash
npx webpack
npx webpack --watch // 自动检测代码的变化
npx webpack-dev-server // 开启服务热更新
```

### 三、plugins：webpack 编译器经过加工后会生成 js 或 css 文件，webpack 编译的过程需要借助一些工具来帮忙，这些工具可以 webpack 来执行一些特定的任务，如：打包优化、资源管理等。

### 四、loader：转换某些类型的模块。如：css 的使用需要使用 loader 加载器

### 五、自定义 webpack 配置

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
   * HtmlWebpackPlugin解决了每次编译后都要手动引入bundle.js去index.html中的问题，它可以在每次编译自动生成一个index.html文件并且自动引入bundle.js
   */
  plugins: [
    // 生成的是默认在dist文件夹里的index.html
    // new HtmlWebpackPlugin()
    // 自定义生成一个打包后的html文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body',
    }),
  ],
};
```

- webpack-dev-server：提供了一个基本的 web server，具有实时重新加载的功能，实现浏览器刷新。

```js
devServer: {
  static: './dist';
}
```

### FAQ：plugins 与 loader 的区别
