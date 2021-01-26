const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.js',
  output: {
    filename: 'js/[name]-[hash].js',//打包出的脚本文件全部放进dist下的js目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',//使用绝对路径
  },
  devServer: {
    host: 'localhost', //主机地址，默认是localhost
    port: '8080', //端口号，默认8080
    open: true, //自动打开页面
    hot: true, //开启热更新
    proxy: {
      //哪些访问需要代理转发
      '/api': {
        target: 'http://62.234.90.11',//目标服务器
        changeOrigin: true,
        secure: false,
        credentials: 'include',
        pathRewrite: {
          '^/api': '/' //重写路径，不需要重写则为‘’
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), //设置@为src目录的别名
    }
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   }
  // },
  module: {
    rules: [
      { //vue 解析
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: { //开发环境使用style-loader打包
            css: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
            scss: [
              process.env.NODE_ENV === 'production' ?
                MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
          }
        }
      },
      { //js 解析
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        //开发环境使用style-loader打包
        use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader',
          {
            //postcss-loader插件，用于自动补全样式的浏览器前缀
            loader: 'postcss-loader',
          }
        ]
      },
      {
        test: /\.scss$/,
        //开发环境使用style-loader打包
        use: [process.env.NODE_ENV === 'production' ?
          MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader',
          {
            loader: 'postcss-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,//以字节为单位，小于该大小的图片编译成base64
            name: 'images/[name]-[hash].[ext]',//所有图片打包到images目录
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',//所有图片放进images目录
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'myWebpack',
      filename: 'index.html',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",//所有抽离出的样式文件，放进css目录
      chunkFilename: "vue-[name]-[hash].css"
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([{
    //   from: __dirname + '/public',
    //   to: __dirname + '/dist/public',
    //   ignore: ['.*']
    // }]),
    new CleanWebpackPlugin()
  ],
}
