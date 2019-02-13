const Chunks2JsonPlugin = require('../../../');

const TEST_NAME = 'public-path';

module.exports = {
  entry: `./${TEST_NAME}.js`,
  plugins: [
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`,
      publicPath: '/docs/',
    }),
  ],
};