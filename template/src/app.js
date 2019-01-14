/**
 * 全局
 */
import { env } from './vendor';

console.log(env);
App({
  onLaunch() {
  },
  onShow() {
  },
  onError(msg) {
    console.log(msg, ' -----> onError');
  },
  pageOnLoad(pageLoadFn) {
    let app = this;
    return {
      onLoad(opts) {
        pageLoadFn.apply(this, {
          ...opts,
          app
        });
      }
    };
  },
  pageOnShow(pageShowFn) {
    let app = this;
    return {
      onShow(opts) {
        pageShowFn.apply(this, {
          ...opts,
          app
        });
      }
    };
  },
  globalData: {
    initData: null
  }
});
