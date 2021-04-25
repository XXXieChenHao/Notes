/**
 * webpack.config.js 是 webpack 的配置文件
 *    当你运行 webpack 指令的时候会加在里面的配置
 *    Node 应用由模块组成，采用 CommonJS 模块规范
 */

// 引入 path 模块的 resolve 方法拼接绝对路径
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack 配置
  // 入口起点
  entry: './src/index.js',
  // 输出位置
  output: {
    filename: 'built.js',
    // 输出路径
    // __dirname 是nodeJs 的变量，代表当前文件(webpack.config.js)的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader 配置
  module: {
    rules: [
      // 配置 loader 配置
      {
        // test 匹配哪些文件  使用正则匹配
        test: /\.css$/,
        // use 表示使用哪些 loader
        use: [
          // 创建一个 style 标签，将 js 中的样式资源插入进去，添加到 head 中生效
          'style-loader',
          // 将 css 文件以字符串的形式变为 CommonJS 模块加载到 js 中，里面内容是样式字符串
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 需要 less-loader 和 less
          'less-loader'
        ]
      }
    ]
  },
  // 插件配置
  plugins: [
    // 详细插件配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 模式  两者只能写一个
  mode: 'development',    // 开发模式
  // mode: 'production',  // 生产模式 （代码被压缩）
}