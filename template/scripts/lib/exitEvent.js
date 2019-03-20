/**
 * 退出事件
 */
const rmFiles = require('./utils/rmFiles');

module.exports = {
  sigint(pathurl, watcher) {
    process.on('SIGINT', () => {
      if (watcher) {
        return watcher.close(() => {
          rmFiles(pathurl);
        });
      }
      return rmFiles(pathurl);
    });
  },
};
