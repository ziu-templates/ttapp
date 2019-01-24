/**
 * 复制静态文件
 */

const path = require('path'),
    ENV = process.env.PRJ_ENV,
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    conf = require('../etc'),
    rePkgConfig = require('./rePkgConfig');

module.exports = ENV === 'development' ? [] : [new CopyWebpackPlugin([
    {
        context: process.cwd(),
        from: `src/${conf[ENV].pkgConfigName}`,
        to: path.resolve(process.cwd(), path.basename(conf[ENV].codePath)),
        transform(content) {
            return rePkgConfig(content.toString());
        }
    }
])];