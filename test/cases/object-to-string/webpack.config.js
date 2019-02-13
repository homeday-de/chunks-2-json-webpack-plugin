const Chunks2JsonPlugin = require('../../../');

const TEST_NAME = 'object-to-string';

module.exports = {
  entry: `./${TEST_NAME}.js`,
  plugins: [
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`,
      objectToString: (output) => {
        return JSON.stringify(output, null, 4);
      },
    }),
  ],
};