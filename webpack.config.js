/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈英杰
 * @Date: 2020-08-01 01:31:57
 * @LastEditors: 陈英杰
 * @LastEditTime: 2020-08-01 02:42:11
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //自动创建html文件
// const CleanWebpackPlugin = require("clean-webpack-plugin"); //清除多余文件

module.exports = {
  devtool: "cheap-module-eval-source-map", // 用于开发调试，方便清楚是那个文件出错 (共有7种)
  entry: {
    index: "./src/App.tsx",
  },
  output: {
    filename: "bundle.js", // 输出的文件名
    path: path.resolve(__dirname, "dist"), //
  },
  module: {
    rules: [
      {
        //转换css文件
        test: /\.css$/,
        use: "style-loader!css-loader",
      },
      {
        //转换less文件
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
        // 加载时顺序从右向左
      },
      {
        // 转换文件png|svg|jpg|gif
        test: /\.(png|svg|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.tsx?$/,
        loader: ["awesome-typescript-loader", "babel-loader"],
      },
      {
        // 转换文件js|jsx
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // 开启一个虚拟服务器
  devServer: {
    contentBase: "./dist",
    port: 8000,
    inline: true,
    hot: true,
  },
  plugins: [
    //每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
    // new CleanWebpackPlugin(["dist"]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      //使用一个模板
      template: "./public/index.html",
    }),
  ],
};
