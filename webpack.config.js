const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "public");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: '[name]-stamp4hash.js',
    path: bundlePath,
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
      index:'public/index.html'
    },
  },
  devtool: 'inline-source-map',
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
};
