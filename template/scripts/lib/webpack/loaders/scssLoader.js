const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
  return {
    test: /\.(scss|sass)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: `css-loader`,
        options: {
          importLoaders: 1,
        },
      },
      'sass-loader',
    ],
  };
};
