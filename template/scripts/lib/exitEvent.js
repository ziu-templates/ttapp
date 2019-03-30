/**
 * 退出事件
 */
const cp = require('cp'),
  conf = require('../etc'),
  exists = require('fs').existsSync,
  path = require('path'),
  codePath = conf[process.env.PRJ_ENV].codePath,
  rmFiles = require('./utils/rmFiles');
module.exports = {
  sigint(pathurl, {webpackWatcher, jsonWatcher, allWatcher}) {
    process.on('SIGINT', () => {
      const prjConfig = path.join(codePath, 'project.config.json');
      if (exists(prjConfig)) {
        cp.sync(prjConfig, 'src/project.config.json');
      }
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
