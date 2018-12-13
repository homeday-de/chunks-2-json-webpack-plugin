const fs  = require('fs');
const path = require('path');

const pluginName = 'Chunks2JsonWebpackPlugin';

const defaultOptions = {
    // ignore files emitted by HMR by default
    excludeFile: /\.hot-update\.js$/,
    // group chunks by extension
    chunkGroupName: filename => /\.([a-z0-9]+(\.map)?)(\?.*)?$/.exec(filename)[1],
    outputDir: process.cwd(),
    filename: 'build-manifest.json',
    // generate contents to save to manifest file
    objectToString: result => JSON.stringify(result),
    publicPath: ''
};

class Chunks2JsonWebpackPlugin {
    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options);
        this.result = {};
    }
    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            this.result = {};
            compilation.chunks.forEach(chunk => {
                if (!this.result[chunk.name]) {
                    this.result[chunk.name] = {};
                }
                chunk.files.forEach(filename => {
                    const exclude = typeof this.options.excludeFile === 'function' ?
                        this.options.excludeFile(filename, chunk) :
                        this.options.excludeFile.test(filename);
                    if (!exclude) {
                        const ext = this.options.chunkGroupName(filename, chunk);
                        if (!this.result[chunk.name][ext]) this.result[chunk.name][ext] = [];
                        this.result[chunk.name][ext].push(this.options.publicPath + filename);
                    }
                });
            });
            this.saveJson();
        });
    }
    saveJson() {
        const projectRoot = process.cwd();
        let pathStep = projectRoot;
        this.options.outputDir.replace(projectRoot, '').split('/').forEach((folder) => {
            pathStep = path.join(pathStep, folder);
            try {
                fs.mkdirSync(pathStep);
            } catch (e) {
                // we don't care if it already exists, just continue...
            }
        });
        const file = path.resolve(this.options.outputDir, this.options.filename);
        const blob = this.options.objectToString(this.result);
        try {
            fs.writeFileSync(file, blob, { flag: 'w' });
            console.log(`File successfully created - ${file}`);
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = Chunks2JsonWebpackPlugin; 