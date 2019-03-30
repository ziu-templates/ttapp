const gulp = require('gulp'),
  conf = require('../../etc'),
  entryHash = require('../utils/entryHash'),
  {getEntry} = require('miniapp-auto-webpack-plugin');


module.exports = function({compiler, watchFn}) {
  if (!watchFn) {
    throw new Error('Compiler not start;');
  }
  let webpackWatcher = watchFn(),
    {entry} = getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.compileCssSuffix,
    }),
    hashVal = entryHash(entry);
  const jsonWatcher = gulp.watch('src/**/*.json');
  jsonWatcher.on('change', function(event) {
    let curHashVal = entryHash(getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.compileCssSuffix,
    }).entry);
    if (hashVal === curHashVal) {
      return false;
    }
    hashVal = curHashVal;
    if (webpackWatcher) {
      webpackWatcher.close(() => {
        console.log('Entry File changed!');
      });
      webpackWatcher = watchFn();
    }
    console.log(event);
  });
  return {
    webpackWatcher,
    jsonWatcher
  };
}
