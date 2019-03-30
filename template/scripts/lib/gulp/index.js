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
  let jsonWatcher = gulp.watch('src/**/*.json');
  jsonWatcher.on('change', reWatch);
  jsonWatcher.on('add', reWatch);
  let allWatcher = gulp.watch('src/**/*', {
    events: ['add', 'unlink'],
    ignored: RegExp(`\.(js|json|${conf.xmlSuffix}${conf.xmlSuffix ? `|${conf.miniJsSuffix}` : ''}|scss)`)
  });
  allWatcher.on('all', function() {
    if (webpackWatcher) {
      webpackWatcher.close(() => {
        console.log('Assets File changed!');
      });
      webpackWatcher = watchFn();
    }
  });

  function reWatch() {
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
  }
  return {
    webpackWatcher,
    jsonWatcher,
    allWatcher
  };
}
