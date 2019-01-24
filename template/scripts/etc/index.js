/**
 * 项目编译配置文件
 */
const path = require('path');

function getPrjConfig({
                          UglifyJs = true,
                          codePath = path.resolve(process.cwd(), 'dist')
                      } = {}) {
    return {
        UglifyJs,
        codePath,
        pkgConfigName: 'project.config.json'
    };
}

module.exports = {
    globalVariable: ['App', 'Page', 'getApp', 'tt'],
    xmlType: /\.(wxml|axml|swan|ttml)(\?.*)?$/,
    cssSuffix: 'ttss',
    development: getPrjConfig({
        UglifyJs: false,
        codePath: path.resolve(process.cwd(), 'dev')
    }),
    testing: getPrjConfig(),
    staging: getPrjConfig(),
    production: getPrjConfig()
};