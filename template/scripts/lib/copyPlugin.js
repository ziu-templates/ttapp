/**
 * 复制静态文件
 */

const path = require('path'),
    fs = require('fs'),
    ignoreParser = require('parse-gitignore'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    minify = require('html-minifier').minify,
    UglifyJS = require('uglify-es'),
    conf = require('../etc');

const ignorePathes = ignoreParser(fs.readFileSync(path.resolve(__dirname, '../.copyignore')));

/**
 * xml minifier
 */
function setXmlMinify(content = '') {
    return minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        sortAttributes: true
    });
}

/**
 * 压缩js
 */
function setJSMinify(content = '') {
    let result = UglifyJS.minify(content, {
        ecma: 6,
        output: {
            beautify: false
        }
    });
    if (result.error) {
        return content;
    }
    return result.code;
}

function setCopyConf({context = path.resolve(process.cwd(), 'src'), from = '**/*', to = path.resolve(__dirname, '../../', 'dist')}) {
    return [
        new CopyWebpackPlugin([
            {
                context: context,
                from: from,
                to: to,
                ignore: ignorePathes,
                transform (content, path) {
                    if (process.env.NODE_ENV === 'development') {
                        return content;
                    }
                    if (conf.xmlType.exec(path)) {
                        return setXmlMinify(content.toString());
                    }
                    if (/\.(js)$/.exec(path)) {
                        return setJSMinify(content.toString());
                    }
                    return content;
                }
            }
        ])
    ];
}
module.exports = setCopyConf;