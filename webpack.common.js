/**
 * Created by gxy on 2017/7/7.
 */
// Modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app/app.js'),
    vendor: ['angular', 'jquery'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{
      // Reference: https://github.com/babel/babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      // Reference: https://github.com/webpack/css-loader
      // Reference: https://github.com/postcss/postcss-loader
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', query: { sourceMap: true } },
          { loader: 'postcss-loader' },
        ],
      }),
    }, {
      // SCSS Loader
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', query: { sourceMap: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      }),
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      use: 'file-loader',
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      test: /\.html$/,
      use: 'raw-loader',
    }],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        sassLoader: {
          includePaths: path.resolve(__dirname, './src'),
        },
      },
    }),
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash:10].min.css',
      allChunks: true }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body',
    }),

  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  devtool: 'cheap-eval-source-map',
};