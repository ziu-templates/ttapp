/**
 * 构建
 */

const webpack = require('webpack'),
  ora = require('ora'),
  baseConfig = require('./webpack/webpack.base.config');

/**
 * [compiler 初始化webpack配置]
 */
let compiler = null;

module.exports = {
  compiler,
  /**
   * [启动编译]
   */
  runCompile(cb = () => {
  }) {
    const spinner = ora('Compiling Start....').start();
    spinner.color = 'yellow';
    compiler = webpack(baseConfig());
    compiler.run((err) => {
      spinner.stop();
      if (err) {
        throw err;
      }
      cb();
    });
    return true;
  },
  /**
   * [监听改变]
   */
  watch() {
    const spinner = ora('Watching Compile Start....').start();
    spinner.color = 'yellow';
    compiler = webpack(baseConfig());
    return compiler.watch({
      aggregateTimeout: 300,
      poll: 1000
    }, (err, stats) => {
      spinner.stop();
      if (err) {
        throw err;
      }
      console.log('Compilation success! Watching...\n');
    });
  }
};