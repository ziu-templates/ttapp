/**
 * 项目编译配置文件
 */
const path = require('path');

function getPrjConfig({
                        UglifyJs = true,
                        codePath = path.resolve(process.cwd(), 'dist/release')
                      } = {}) {
  return {
    UglifyJs,
    codePath,
    pkgConfigName: 'project.config.json',
  };
}

module.exports = {
  compileCssSuffix: 'scss',
  cssSuffix: 'ttss',
  xmlSuffix: 'ttml',
  eslintSuffix: '(js)',
  miniJsSuffix: 'js',
  globalObject: 'global',
  development: getPrjConfig({
    UglifyJs: false,
    codePath: path.resolve(process.cwd(), 'dist/dev'),
  }),
  testing: getPrjConfig({
    codePath: path.resolve(process.cwd(), 'dist/testing'),
  }),
  staging: getPrjConfig({
    codePath: path.resolve(process.cwd(), 'dist/staging'),
  }),
  production: getPrjConfig(),
};