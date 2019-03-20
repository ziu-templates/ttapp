const merge = require('merge'),
  {prjEnvComp} = require('./envCompare'),
  distPkg = require('../../etc/project.config');
module.exports = function(content = '{}') {
  if (prjEnvComp('development')) {
    return content;
  }
  let pkgConf = '';
  try {
    pkgConf = JSON.stringify(merge(JSON.parse(content), distPkg));
  } catch (e) {
    throw e;
  }
  return pkgConf;
}