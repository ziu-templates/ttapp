const path = require('path'),
  {getEntry, MiniappAutoPlugin} = require('miniapp-auto-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  StyleLintPlugin  = require('stylelint-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  notifier = require('node-notifier'),
  ICON = path.join(process.cwd(), 'scripts/logo.png'),
  ENV = process.env.PRJ_ENV,
  {envComp} = require('../utils'),
  conf = require('../../etc'),
  codePath = conf[ENV].codePath;

const xmlLoader = require('./loaders/xmlLoader'),
  miniJsLoader = require('./loaders/miniJsLoader'),
  scssLoader = require('./loaders/scssLoader'),
  {{#lint}}
  eslintLoader = require('./loaders/eslintLoader'),
  {{/lint}}
  fileLoader = require('./loaders/fileLoader'),
  optimizeCss = require('./plugins/optimizeCss'),
  optimizeUglifyJs = require('./plugins/optimizeUglifyJs'),
  miniCssPlugin = require('./plugins/miniCssPlugin'),
  copyProjectConf = require('./plugins/copyProjectConfig'),
  definePlugin = require('./plugins/definePlugin'),
  sourceMapPlugin = require('./plugins/sourceMapPlugin'),
  copyJsonPlugin = require('./plugins/copyJsonPlugin');

module.exports = function() {
  let {entry, entryJsonFiles} = getEntry({
    xmlSuffix: conf.xmlSuffix,
    cssSuffix: conf.cssSuffix,
    compileCssSuffix: conf.compileCssSuffix,
  });
  const webpackBaseConfig = {
    mode: process.env.NODE_ENV,
    entry,
    output: {
      filename: '[name].js',
      path: codePath,
      globalObject: conf.globalObject || 'global',
    },
    devtool: false,
    resolve: {
      extensions: [`.${conf.miniJsSuffix}`, `.${conf.xmlSuffix}`, '.js', '.json'],
    },
    module: {
      rules: [
        {{#lint}}
        ...eslintLoader(conf.eslintSuffix),
        {{/lint}}
        ...xmlLoader(conf.xmlSuffix),
        ...miniJsLoader(conf.miniJsSuffix),
        scssLoader(conf.cssSuffix),
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /(node_modules)/,
        },
        {
          test: /\.json$/,
          use: {
            loader: 'mini-json-loader',
            options: {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: fileLoader(),
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: fileLoader(),
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: fileLoader(),
        },
      ],
    },
    optimization: {
      minimize: envComp('production'),
      minimizer: [
        ...optimizeCss(conf.cssSuffix),
        ...optimizeUglifyJs(),
      ],
      noEmitOnErrors: true,
      runtimeChunk: {
        name: 'commons/runtime'
      },
      splitChunks: {
        cacheGroups: {
          style: {
            test: new RegExp(`\.${conf.compileCssSuffix}$`),
            name: 'commons/style',
            chunks: 'all',
            minSize: 0,
            maxSize: 300 * 1000,
            minChunks: 2,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'commons/vendor',
            chunks: 'initial',
            minSize: 0,
            maxSize: 300 * 1000,
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
            maxSize: 300 * 1000,
            minChunks: 2,
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
      new MiniappAutoPlugin({
        cssSuffix: conf.cssSuffix,
        xmlSuffix: conf.xmlSuffix,
      }),
      new StyleLintPlugin(),
      ...sourceMapPlugin(conf.sourceMap),
      ...miniCssPlugin(conf.cssSuffix),
      ...copyJsonPlugin(entryJsonFiles, codePath),
      ...copyProjectConf
    ],
  };
  if (process.env.bundleAnalyzerReport) {
    webpackBaseConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  return webpackBaseConfig;
};
