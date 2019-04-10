const { envComp } = require('../../utils');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`);
  return suffix ? [{
    test: reg,
    use: [
      {
        loader: 'mini-js-loader',
        options: {
          filename: `[name].${suffix}`,
          minimize: envComp('production'),
        },
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'minify',
              {
                builtIns: envComp('production'),
                evaluate: envComp('production'),
                mangle: envComp('production'),
              }
            ],
            [
              "@babel/preset-env",
              {
                "modules": false,
              },
            ]
          ],
          plugins: ['transform-undefined-to-void-fn']
        },
      },
    ],
  }] : [];
};
