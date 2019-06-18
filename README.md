
将自己做demo页，整合到一个应用中，因此打算使用react-router，不同url显示不同的demo。另外简单研究下webpack打包应用。
 
实践过程中，遇到了一些问题，参考了以下资料

[react英文文档](https://reacttraining.com/react-router/core/api/Route)
[从头开始创建一个 React 应用](https://zhuanlan.zhihu.com/p/36137966)
[webpack-dev-server使用react-router browserHistory的配置](http://echizen.github.io/tech/2016/07-05-webpack-dev-server-react-router-config)
[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094)
[git修改提交者信息](https://www.hidennis.tech/2016/06/07/git-change-author-email/)


一、 项目目录

1. 初始化项目，生成`package.json`
```
npm init  
```

2. 在项目文件夹下添加 public 目录中，存放所有静态资源。新建` index.html`

```
// index.html

<div id="app"></div>         //  React 应用通过JS插入 DOM 结构的根节点。

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
const path = require("path");     // 当前应用目录
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "public");    // 打包文件存放的位置

module.exports = {
  entry: {
    index: "./src/index.js",    // 入口文件
  },
  output: {
    filename: '[name]-stamp4hash.js',       // name是entry中的key名
    path: bundlePath,     //  打包文件实际存放的位置，绝对路径
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['es2015', 'stage-0', 'react'] }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
            }
          },
        ],
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  devServer: {
    historyApiFallback:{
      index:'public/index.html'    // 404页面导入到index.html
    },
  },
  devtool: 'inline-source-map',
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
};


```

四、文件入口

1. src文件夹下新建`index.js`

指定插入想渲染的页面位置

```
import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/App';

ReactDom.render(
  <App />, document.getElementById('app'),
)


```

2. src文件夹下新建pages，新建`App.jsx`
整个应用的route

```
import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

import Rain from './rain/index';
import Test from './test/index';

const history = createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <Router history={history} >
        <Route path="/inbox" component={Test} />
        <Route path="/about" component={Rain} />
      </Router>
    );
  }
}
```

3. pages目录下,新建`rain/index.jsx`
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


4. pages目录下,新建`test/index.jsx`
```
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <div>
      <p>hello everybody</p>
    </div>);
  }
}

```



5. package.json配置webpack启动命令
```
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack --mode production"    //打包文件，带production参数就不会安装devDependencies里面的包
  },
```



`npm start` 命令启动项目。

> 执行命令以后 public 文件夹下并没有内容产生。那是因为 devServer 生成的文件会直接放在内存中运行，当服务关闭时，这些文件就随之消失了。

执行 npm run build 后就可以在 public 文件夹下看到生成打包后的文件



四、loader
1. 直接导入图片，需要使用`file-loader`
```
npm install file-loader --save-dev

```
就可以使用
```

import img from './file.png';

```

[github地址](https://github.com/qqxu/activity)
