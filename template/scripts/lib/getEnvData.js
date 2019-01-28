const path = require('path'),
  isExists = require('fs').existsSync,
  dotenv = require('dotenv'),
  merge = require('merge'),
  defaultEnvPath = path.resolve(process.cwd(), '.env'),
  runtimeEnvPath = path.resolve(process.cwd(), `.env.${process.env.PRJ_ENV}`);

let defaultEnv = {
    PRJ_ENV: process.env.PRJ_ENV
  },
  runtimeEnv = {};

if (isExists(defaultEnvPath)) {
  defaultEnv = dotenv.config({
    path: defaultEnvPath
  }).parsed || {};
}

if (isExists(runtimeEnvPath)) {
  runtimeEnv = dotenv.config({
    path: runtimeEnvPath
  }).parsed || {};
}

let env = merge(defaultEnv, runtimeEnv),
  injectionEnv = {};

Object.keys(env).forEach((key) => {
  injectionEnv[key] = JSON.stringify(env[key]);
});
module.exports = injectionEnv;


