/**
 * 全局
 */
import { updateApp } from 'miniapp-utils';

updateApp();
console.log(process.env.ENV_DATA);
App({
  onLaunch() {
  },
  onShow() {
  },
  onError(msg) {
    console.log(msg, ' -----> onError');
  },
  globalData: {
    initData: null,
  },
});
