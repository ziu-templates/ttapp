/**
 * 构建
 * dev 不开启压缩scss压缩 js wxml
 */
const builder = require('../lib/build'),
  gulpBuilder = require('../lib/gulp'),
  exitEvent = require('../lib/exitEvent'),
  conf = require('../etc'),
  defaultPathurl = `${conf[process.env.PRJ_ENV].codePath}/**/*`,
  rmFiles = require('../lib/utils/rmFiles');

module.exports = function(pathurl = defaultPathurl) {
  rmFiles(pathurl, () => {
    if (process.env.NODE_ENV === 'development') {
      // return exitEvent.sigint(pathurl, builder.watch());
      return exitEvent.sigint(pathurl, gulpBuilder({
        isWatch: true,
        watchFn: builder.watch
      }));
    }
    return builder.runCompile(() => {
      console.log('build successed!');
    });
  });
};