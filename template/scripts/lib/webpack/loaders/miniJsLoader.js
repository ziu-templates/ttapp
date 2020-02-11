const { envComp } = require('../../utils');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`),
    undefinedToVoid = false;
  return suffix ? [{
    test: reg,
    use: [
      {
        loader: 'mini-js-loader',
        options: {
          filename: `[name].${suffix}`,
          minimize: envComp('production'),
          undefinedToVoid,
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
                undefinedToVoid,
              }
            ],
            [
              "@babel/preset-env",
              {
                "modules": false,
              },
            ]
          ],
          ...(undefinedToVoid ? {
            plugins: ['transform-undefined-to-void-fn']
          } : {}),
        },
      },
    ],
  }] : [];
};
