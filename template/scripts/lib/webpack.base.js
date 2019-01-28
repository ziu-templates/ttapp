/**
 * 编译vendor
 */
const ENV = process.env.PRJ_ENV,
  webpack = require('webpack'),
  conf = require('../etc'),
  setCopyConf = require('./copyPlugin'),
  baseUglifyConfig = require('./baseUglifyConfig'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  envData = require('./getEnvData');

/**
 * 压缩混淆vendor.js
 */
function getUglifyJsPlugin() {
  return (!conf[ENV] || conf[ENV].UglifyJs) ? [baseUglifyConfig] : [];
}

module.exports = {
  entry: {
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].js',
    path: conf[ENV].codePath,
    library: 'vendor',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    ...setCopyConf({
      to: conf[ENV].codePath
    }),
    ...getUglifyJsPlugin(),
    ...require('./copyPrjConfigJSON'),
    new webpack.DefinePlugin({
      'process.env': {
        PRJ_ENV: JSON.stringify(ENV),
        ...envData
      }
    }),
    new FriendlyErrorsPlugin()
  ]
};