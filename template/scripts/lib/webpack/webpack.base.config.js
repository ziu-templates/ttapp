const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  {getEntry, MiniappAutoPlugin} = require('miniapp-auto-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  notifier = require('node-notifier'),
  ICON = path.join(process.cwd(), 'scripts/logo.png'),
  ENV = process.env.PRJ_ENV,
  {envComp} = require('../utils'),
  conf = require('../../etc'),
  codePath = conf[ENV].codePath;

const xmlLoader = require('./loaders/xmlLoader'),
  miniJsLoader = require('./loaders/miniJsLoader'),
  scssLoader = require('./loaders/scssLoader'),
  eslintLoader = require('./loaders/eslintLoader'),
  optimizeCss = require('./plugins/optimizeCss'),
  optimizeUglifyJs = require('./plugins/optimizeUglifyJs'),
  miniCssPlugin = require('./plugins/miniCssPlugin'),
  copyProjectConf = require('./plugins/copyProjectConfig'),
  definePlugin = require('./plugins/definePlugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: getEntry({
    xmlSuffix: conf.xmlSuffix,
    cssSuffix: conf.compileCssSuffix,
  }),
  output: {
    filename: '[name].js',
    path: codePath,
    globalObject: conf.globalObject || 'global',
  },
  devtool: false,
  module: {
    rules: [
      ...eslintLoader(conf.eslintSuffix),
      ...xmlLoader(conf.xmlSuffix),
      ...miniJsLoader(conf.miniJsSuffix),
      scssLoader(),
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: envComp('producion'),
    minimizer: [
      ...optimizeCss(),
      ...optimizeUglifyJs(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons/vendor',
          chunks: 'initial',
          minSize: 0,
          minChunks: 1,
        },
        commons: {
          test: function(module) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(process.cwd(), 'src')
              ) === 0);
          },
          name: 'commons/commons',
          chunks: 'all',
          minSize: 0,
          minChunks: 1,
        },
      },
    },
  },
  plugins: [
    definePlugin(),
    new FriendlyErrorsPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: "Webpack error",
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
          icon: ICON,
        });
      },
    }),
    new MiniappAutoPlugin(),
    ...miniCssPlugin(conf.cssSuffix),
    new CopyWebpackPlugin([
      {
        context: path.resolve(process.cwd(), 'src'),
        from: '**/*.*(json|png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)',
        to: codePath,
      },
    ]),
    ...copyProjectConf
  ],
};
