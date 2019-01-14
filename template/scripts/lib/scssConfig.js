/**
 * 编译scss
 */
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    conf = require('../etc'),
    filename = `[name].${conf.cssSuffix}`;

function setCssMini() {
    return process.env.NODE_ENV === 'production' ? '?minimize' : '';
}

function getGcssConfig(entry = {}, dest = path.resolve(process.cwd(), 'dist')) {

    return {
        entry,
        output: {
            filename,
            path: dest
        },
        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [`css-loader${setCssMini()}`, 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin(filename),
            new FriendlyErrorsPlugin()
        ]
    };
}

module.exports = getGcssConfig;
