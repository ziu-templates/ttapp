/**
 * scss的webpack配置
 */
const path = require('path'),
    globby = require('globby'),
    fs = require('fs'),
    ignoreParser = require('parse-gitignore'),
    conf = require('../etc'),
    getScssConfig = require('./scssConfig'),
    ignorePathes = ignoreParser(fs.readFileSync(path.resolve(__dirname, '../.scssignore')));

const scssFiles = globby.sync('src', {
    ignore: ignorePathes,
    expandDirectories: {
        extensions: ['scss']
    }
});
const scssWebpackConf = scssFiles.map((pathname) => {
    let scssName = /([\w\-]*\.(scss|sass))$/.exec(pathname)[0],
        dest = pathname.replace(/^src/, conf[process.env.PRJ_ENV].dirname).replace(/([\w]*.(scss|sass))$/, '');

    return getScssConfig({
        [`${scssName.replace('.scss', '')}`]: `./${pathname}`
    }, path.resolve(process.cwd(), dest));
});

module.exports = scssWebpackConf;
