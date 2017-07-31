/**
 * Created by gxy on 2017/7/7.
 */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
const CommonConfig = require('./webpack.common.js');

const devConfig = {
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEVELOPMENT: JSON.stringify('development'),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};

module.exports = Merge(CommonConfig, devConfig);
