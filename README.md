#### React
一、 项目目录

1. 初始化项目，生成`package.json`
```
npm init  
```

2. 在项目文件夹下添加dist文件夹，用来存放webpack打包后的输出

3. 在项目文件夹下添加 public 目录中，存放所有静态资源。新建` index.html`

```
<!DOCTYPE html>
<html>
<head>
	<title>红包雨</title>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
</head>
<body>
	<div id="app"></div>         //  React 应用通过JS插入 DOM 结构的根节点。
        <script src="../dist/bundle.js"></script>   // 引入webpack 打包后最终输出的文件bundle.js

</body>
</html>

```


二、 使用babel
1. 安装
> React 使用 JSX 语法，将 HTML 模板直接嵌入到了 JS 代码里面，这样就做到了模板和组件关联。但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 JSX 编译输出成 JS 代码才能使用。

```
npm install --save-dev babel-core@6.26.0 babel-cli@6.26.0 babel-preset-env@1.6.1 babel-preset-react@6.24.1
```

2. 项目文件夹下，新建`.babelrc`
> env 和 react 预设集分别用于转换 ES6+ 和 React 代码。
```
{
  "presets": ["env", "react"]
}
```

三、 使用webpack
1.安装 
```
npm install --save-dev webpack@4.6.0 webpack-cli@2.0.14 webpack-dev-server@3.1.3 style-loader@0.21.0 css-loader@0.28.11 babel-loader@7.1.4

```

2. 项目根目录下，新建webpack.config.js 文件
```
const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "dist/");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    publicPath: bundlePath,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname,'public'),   
    port: 3000,
    publicPath: "http://localhost:3000/dist"
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]    // 热更新
};

```

四、文件入口
1. src文件夹下新建pages，新建`App.jsx`
```
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (<div>
      <p>hello world</p>
    </div>);
  }
}


```

2. src文件夹下新建`index.js`

指定插入想渲染的页面位置

```
import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/App';

ReactDom.render(
  <App />, document.getElementById('app'),
)


```

3. package.json配置webpack启动命令
```
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack --mode production"
  },
```

npm start 命令启动项目。

> 执行命令以后 dist 文件夹下并没有内容产生。那是因为 devServer 生成的文件会直接放在内存中运行，当服务关闭时，这些文件就随之消失了。

执行 npm run build 后就可以在 dist 文件夹下看到生成打包后的文件


4. 启动tomcat，浏览器自动打开链接`http://localhost:3000/`
![输出](https://upload-images.jianshu.io/upload_images/6517590-cc0ce650acd25cb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

四、

npm install file-loader --save-dev

import img from './file.png';

参考网址:
[tomcat启动web应用](https://blog.csdn.net/HughGilbert/article/details/56424137)
[从头开始创建一个 React 应用](https://zhuanlan.zhihu.com/p/36137966)