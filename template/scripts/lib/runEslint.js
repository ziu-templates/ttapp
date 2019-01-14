/**
 * 执行eslint检测js文件
 */

const path = require('path'),
  CLIEngine = require('eslint').CLIEngine,
  clearConsole = require('./clearConsole'),
  eslintCli = new CLIEngine({
    configFile: path.resolve(__dirname, '../.eslintrc.js'),
    baseConfig: path.resolve(__dirname, '../.eslintrc.js'),
    ignorePath: path.resolve(__dirname, '../.eslintignore'),
    extensions: ['.js']
  }),
  formatter = require('eslint-friendly-formatter');

function runEslint(cb = () => {
}) {
  let eslintResult = eslintCli.executeOnFiles(['./src']),
    results = eslintResult.results;

  setTimeout(() => {
    if (eslintResult.errorCount) {
      clearConsole();
    }
    console.log(formatter(results));
  }, 0);

  if (!eslintResult.errorCount) {
    clearConsole('Eslint error: ' + eslintResult.errorCount);
    cb();
  }
}

module.exports = runEslint;
