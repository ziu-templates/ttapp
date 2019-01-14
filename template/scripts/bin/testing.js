/**
 * testing环境
 */

process.env.NODE_ENV = 'production';
process.env.PRJ_ENV = 'testing';
const build = require('./build');

build();
