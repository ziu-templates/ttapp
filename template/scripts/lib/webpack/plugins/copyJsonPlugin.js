const path = require('path'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(entryJsonFiles, codePath) {
  if (!entryJsonFiles) {
    return [];
  }
  let entryJson = Object.entries(entryJsonFiles).map(([page, pathurl]) => {
    return {
      context: process.cwd(),
      from: pathurl[0],
      to: path.join(codePath, `${page}.json`),
    };
  });
  return [new CopyWebpackPlugin([
    ...entryJson
  ])];
};
