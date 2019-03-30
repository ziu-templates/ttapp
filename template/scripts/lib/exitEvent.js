/**
 * 退出事件
 */
const rmFiles = require('./utils/rmFiles');

module.exports = {
  sigint(pathurl, {webpackWatcher, jsonWatcher}) {
    process.on('SIGINT', () => {
      if (!webpackWatcher && !jsonWatcher) {
        return rmFiles(pathurl);
      }
      if (webpackWatcher) {
        return webpackWatcher.close(() => {
          rmFiles(pathurl);
        });
      }
      if (jsonWatcher) {
        return jsonWatcher.close(() => {
          rmFiles(pathurl);
        });
      }
    });
  },
};
