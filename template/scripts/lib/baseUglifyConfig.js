
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = new UglifyJsPlugin({
    uglifyOptions: {
        mangle: {
            eval: true
        },
        output: {
            comments: false,
            beautify: false,
        },
        compress: {
            warnings: true
        }
    },
    sourceMap: false,
    parallel: 4
});