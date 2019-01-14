/**
 * 构建
 */

const webpack = require('webpack'),
    baseConfig = require('../lib/webpack.base'),
    scssConfigs = require('../lib/webpack.scss')
{{#lint}},
runEslint = require('../lib/runEslint')
{{/lint}};

    let configs = [...scssConfigs, baseConfig],
        compilerTimes = 1,
        /**
         * [compiler 初始化webpack配置]
         */
        compiler = webpack(configs);

    module.exports = {
        /**
         * [启动编译]
         */
        runCompile(cb = () => {}) {
            compiler.run((err) => {
                if (err) {
                    throw err;
                }
                cb();
            });
            return true;
        },
        /**
         * [监听改变]
         */
        watch() {
            return compiler.watch({
                aggregateTimeout: 300,
                poll: 1000
            }, (err, stats) => {
                if (err) {
                    throw err;
                }
                // console.log(stats.toString());
                if (compilerTimes !== 1) {
                    console.log(`Compilation success! ${compilerTimes} times \n`);
                }
                console.log('watching...\n');
                ++compilerTimes;
                {{#lint}}
                /**
                 * 执行eslint检测
                 */
                runEslint(() => {
                    console.log('watching...\n');
                });
                {{/lint}}
                });
        }
    };