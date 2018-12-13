const fs  = require('fs');
const path = require('path');

const pluginName = 'Chunks2JsonWebpackPlugin';

class Chunks2JsonWebpackPlugin {
    constructor(options) {
        this.options = options;
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
                    if (!filename.endsWith('.hot-update.js')) {
                        const ext = /\.([a-z0-9]+(\.map)?)(\?.*)?$/i.exec(filename)[1];
                        if (!this.result[chunk.name][ext]) this.result[chunk.name][ext] = [];
                        this.result[chunk.name][ext].push((this.options.publicPath || '/') + filename);
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
        const file = path.join(process.cwd(), this.options.outputDir, this.options.filename);
        const blob = JSON.stringify(this.result, undefined, 2);
        try {
            fs.writeFileSync(file, blob, { flag: 'w' });
            console.log(`File successfully created - ${file}`);
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = Chunks2JsonWebpackPlugin; 