const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + 'node_modules',
        include: __dirname + 'src',
        options: {
          'presets': ['env'] 
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      excludeChunks: ['node_modules'],
      files: {
        js: ['js/index.js'],
        chunks: {
          'main': {
            'entry': 'dist/bundle.js'
          }
        }
      }
    })
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    host: 'localhost',
    port: 3000
  }
}