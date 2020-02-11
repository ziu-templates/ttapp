/**
 * 全局
 */
import { updateApp } from 'miniapp-utils';
import { getENV } from './utils/util';
import app from './_app';

updateApp();
console.log(getENV());
App(app);
