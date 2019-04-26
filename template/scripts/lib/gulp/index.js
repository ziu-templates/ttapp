const gulp = require('gulp'),
  cp = require('cp'),
  exists = require('fs').existsSync,
  path = require('path'),
  conf = require('../../etc'),
  codePath = conf[process.env.PRJ_ENV].codePath,
  entryHash = require('../utils/entryHash'),
  {getEntry} = require('miniapp-auto-webpack-plugin');


module.exports = function({compiler, watchFn}) {
  const scope = this;
  if (!watchFn) {
    throw new Error('Compiler not start;');
  }
  scope.webpackWatcher = watchFn();
  let {entry} = getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.cssSuffix,
      compileCssSuffix: conf.compileCssSuffix,
    }),
    hashVal = entryHash(entry);
  scope.jsonWatcher = gulp.watch('src/**/*.json');
  scope.jsonWatcher.on('change', reWatch);
  scope.jsonWatcher.on('add', reWatch);
  scope.jsonWatcher.on('unlink', reWatch);
  scope.allWatcher = gulp.watch('src/**/*', {
    events: ['add', 'addDir', 'unlinkDir', 'unlink'],
    ignored: new RegExp(`\.(js|json|${conf.xmlSuffix}${conf.miniJsSuffix ? `|${conf.miniJsSuffix}` : ''}|${conf.compileCssSuffix})$`)
  });

  let hasRunTimer = false,
    preLen = 0,
    curLen = 0;
  scope.allWatcher.on('all', function() {
    ++curLen;
    if (!hasRunTimer) {
      hasRunTimer = true;
      checkWatcherEnd()
    }
  });

  function checkWatcherEnd() {
    setTimeout(() => {
      if (curLen === preLen) {
        hasRunTimer = false;
        if (scope.webpackWatcher) {
          cpProjectConfig();
          scope.webpackWatcher.close(() => {
            console.log('Assets File changed!');
            setTimeout(() => {
              scope.webpackWatcher = watchFn();
            }, 200);
            preLen = curLen = 0;
          });
          scope.webpackWatcher = null;
          return false;
        }
      }
      preLen = curLen;
      checkWatcherEnd();
    }, 300);
  }

  function reWatch() {
    let curHashVal = entryHash(getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.compileCssSuffix,
    }).entry);
    if (hashVal === curHashVal) {
      return false;
    }
    hashVal = curHashVal;
    if (scope.webpackWatcher) {
      cpProjectConfig();
      scope.webpackWatcher.close(() => {
        console.log('Entry File changed!');
        scope.webpackWatcher = watchFn();
      });
      scope.webpackWatcher = null;
    }
  }

  function cpProjectConfig() {
    const prjConfig = path.join(codePath, 'project.config.json');
    if (exists(prjConfig)) {
      cp.sync(prjConfig, 'src/project.config.json');
    }
  }
}
