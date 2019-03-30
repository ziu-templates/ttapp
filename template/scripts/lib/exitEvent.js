/**
 * 退出事件
 */
const rmFiles = require('./utils/rmFiles');

module.exports = {
  sigint(pathurl, {webpackWatcher, jsonWatcher, allWatcher}) {
    process.on('SIGINT', () => {
      if (!webpackWatcher && !jsonWatcher) {
        return rmFiles(pathurl);
      }
      if (webpackWatcher) {
        webpackWatcher.close(() => {
          rmFiles(pathurl);
        });
      }
      if (jsonWatcher) {
        jsonWatcher.close();
      }
      if (allWatcher) {
        allWatcher.close();
      }
    });
  },
};
