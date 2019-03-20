/**
 * 构建
 */

const webpack = require('webpack'),
  ora = require('ora'),
  baseConfig = require('./webpack/webpack.base.config');

let compilerTimes = 1,
  /**
   * [compiler 初始化webpack配置]
   */
  compiler = webpack(baseConfig);

const spinner = ora('Compiling Start....').start();
spinner.color = 'yellow';

module.exports = {
  /**
   * [启动编译]
   */
  runCompile(cb = () => {
  }) {
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
    return compiler.watch({
      aggregateTimeout: 300,
      poll: 1000
    }, (err, stats) => {
      spinner.stop();
      if (err) {
        throw err;
      }
      if (compilerTimes !== 1) {
        console.log(`Compilation success! ${compilerTimes} times \n`);
      }
      console.log('watching...\n');
      ++compilerTimes;
    });
  }
};