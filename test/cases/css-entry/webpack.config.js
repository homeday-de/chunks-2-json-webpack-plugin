const Chunks2JsonPlugin = require('../../../');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TEST_NAME = 'css-entry';

module.exports = {
  entry: `./${TEST_NAME}.js`,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: "[name].[hash].css",
        chunkFilename: "[id].css"
      }
    ),
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`
    }),
  ],
};