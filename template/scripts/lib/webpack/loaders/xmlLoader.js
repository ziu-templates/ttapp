const {envComp} = require('../../utils');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`);
  return suffix ? [{
    test: reg,
    use: [{
      loader: 'mini-xml-loader',
      options: {
        filename: `[name].${suffix}`,
        minimize: envComp('producion'),
      },
    }],
  }] : [];
};
