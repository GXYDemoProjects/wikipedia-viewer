/**
 * Created by gxy on 2017/7/7.
 */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonConfig = require('./webpack.common.js');

const prodConfig = {
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: '[name].[chunkHash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
  },
  plugins: [


    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.UglifyJsPlugin(),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/public'),
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        PRODUCTION: JSON.stringify('production'),
      }
    }),
  ],
  devtool: 'cheap-source-map',
};
const prod = Merge(CommonConfig, prodConfig);
console.log('prod:', prod);
module.exports = prod;
