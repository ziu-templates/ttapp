const merge = require('merge'),
    distPkg = require('../etc/project.config');
module.exports = function(content = '{}') {
    if (process.env.PRJ_ENV === 'development') {
        return content;
    }
    let pkgConf = '';
    try {
        pkgConf = JSON.stringify(merge(JSON.parse(content), distPkg));
    } catch(e) {
        throw e;
    }
    return pkgConf;
}