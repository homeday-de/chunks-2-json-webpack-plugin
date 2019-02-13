const Chunks2JsonPlugin = require('../../../');

const TEST_NAME = 'multiple-entries';

module.exports = {
  entry: {
    one: './one-entry.js',
    two:  './two-entry.js',
  },
  plugins: [
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`
    }),
  ],
};