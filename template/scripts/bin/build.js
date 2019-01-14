/**
 * 构建
 */

const path = require('path'),
    builder = require('../lib/build'),
    exitEvent = require('../lib/exitEvent'),
    conf = require('../etc'),
    defaultPathurl = path.resolve(process.cwd(), `${conf[process.env.PRJ_ENV].dirname}/**/*`);
    rmFiles = require('../lib/rmFiles');

module.exports = function(pathurl = defaultPathurl) {
    rmFiles(pathurl, () => {
        if (process.env.NODE_ENV === 'development') {
            return exitEvent.sigint(pathurl, builder.watch());
        }
        builder.runCompile(() => {
            console.log('build successed!');
        });
    });
};
