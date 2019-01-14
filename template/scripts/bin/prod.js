/**
 * production环境
 */

process.env.PRJ_ENV = process.env.NODE_ENV = 'production';
const build = require('./build');

build();
