const Chunks2JsonPlugin = require('../../../');

const TEST_NAME = 'chunk-group-name';

module.exports = {
  entry: `./${TEST_NAME}.js`,
  plugins: [
    new Chunks2JsonPlugin({
      outputDir: `./test/js/${TEST_NAME}`,
      chunkGroupName: (filename, chunk) => {
        if (filename.includes('js')) {
          return 'javascript';
        }
      },
    }),
  ],
};