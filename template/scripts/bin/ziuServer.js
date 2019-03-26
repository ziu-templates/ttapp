
const minimist = require('minimist'),
  conf = require('../etc'),
  PRJ_ENV = minimist(process.argv.slice(2))._[0] || 'production';

if (!conf.envList[PRJ_ENV]) {
  throw new Error(`Not Support ${PRJ_ENV} env!`);
  process.exit(1);
}
process.env.NODE_ENV = 'production';

if (PRJ_ENV === 'development') {
  process.env.NODE_ENV = PRJ_ENV;
}
process.env.PRJ_ENV = PRJ_ENV;

const build = require('./build');

build();
