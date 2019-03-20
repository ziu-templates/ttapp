const {envComp} = require('../../utils');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`);
  return suffix ? [{
    test: reg,
    use: [
      {
        loader: 'mini-js-loader',
        options: {
          filename: `[name].${suffix}`,
          minimize: envComp('producion'),
        },
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [[
            "@babel/preset-env",
            {
              "modules": false,
            },
          ]],
        },
      },
    ],
  }] : [];
};
