/**
 * Created by gxy on 2017/7/7.
 */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const testConfig = {
  entry: {
  },
  output: {
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/,
      ],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true,
      },
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        TEST: JSON.stringify('test'),
      }
    }),
  ],
};

module.exports = Merge.strategy({
  entry: 'replace', // or 'replace', defaults to 'append'
  output: 'replace',
})(CommonConfig, testConfig);
