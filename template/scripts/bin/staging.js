/**
 * testing环境
 */

process.env.NODE_ENV = 'production';
process.env.PRJ_ENV = 'staging';
const build = require('./build');

build();
