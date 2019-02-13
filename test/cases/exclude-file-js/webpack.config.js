const Chunks2JsonPlugin = require('../../../');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TEST_NAME = 'exclude-file-js';

module.exports = {
  entry: `./${TEST_NAME}.js`,
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`,
      excludeFile:(filename, chunk) => filename.includes('.map'),
    }),
  ],
};