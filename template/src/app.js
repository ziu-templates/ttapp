/**
 * 全局
 */
console.log(process.env.ENV_DATA);
App({
  onLaunch() {
  },
  onShow() {
  },
  onError(msg) {
    console.log(msg, ' -----> onError');
  },
  pageOnLoad(pageLoadFn) {
    const app = this;
    return {
      onLoad(opts) {
        pageLoadFn.apply(this, {
          ...opts,
          app,
        });
      },
    };
  },
  pageOnShow(pageShowFn) {
    const app = this;
    return {
      onShow(opts) {
        pageShowFn.apply(this, {
          ...opts,
          app,
        });
      },
    };
  },
  globalData: {
    initData: null,
  },
});
