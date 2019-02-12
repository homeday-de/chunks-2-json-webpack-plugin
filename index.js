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
        // overwrite default options
        this.options = Object.assign({}, defaultOptions, options);
        this.result = {};
    }
    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            this.result = {};
            compilation.chunks.forEach(chunk => {
                if (this.result[chunk.name] === undefined) {
                    this.result[chunk.name] = {};
                }
                chunk.files.forEach(filename => {
                    if (this._excludeChunk(this.options.excludeFile, filename, chunk) === true) {
                        return;
                    }
                    const ext = this.options.chunkGroupName(filename, chunk);
                    if (this.result[chunk.name][ext] === undefined) {
                        this.result[chunk.name][ext] = [];
                    }
                    this.result[chunk.name][ext].push(`${this.options.publicPath}${filename}`);
                });
            });
            this.saveJson();
        });
    }
    saveJson() {
        // try to create outputDir folder if it is within project root
        if (this._shouldFolderBeCreated(this.options.outputDir) === true) {
            let pathStep = process.cwd();
            // remove relative prefix
            const normalizedOutputPath = this._normalizeOutputDir(this.options.outputDir);
            normalizedOutputPath.split('/').forEach((folder) => {
                pathStep = path.join(pathStep, folder);
                try {
                    fs.mkdirSync(pathStep);
                } catch (e) {
                    // we don't care if it already exists, just continue...
                }
            });
        }
        const file = path.resolve(this.options.outputDir, this.options.filename);
        const blob = this.options.objectToString(this.result);
        try {
            fs.writeFileSync(file, blob, { flag: 'w' });
            console.log(`File successfully created - ${file}`);
        } catch(e) {
            console.error(e);
        }
    }

    /**
     * We might want to skip some entries
     * this function checks users criteria and returns a bool
     * @param Function|RegEx excludeCriterium - passed option to skip some entries
     */
    _excludeChunk(excludeCriterium, filename, chunk) {
        if (typeof excludeCriterium === 'function') {
            return excludeCriterium(filename, chunk);
        }
        if (excludeCriterium instanceof RegExp) {
            return excludeCriterium.test(filename);
        }
       // if wrong criteria is passed, we're gonan include the file by default
        return true;
    }
    /**
     * We need to make sure, that we can actually create the folder.
     * We can do so, if the desired output is inside project root
     * @param String outputDir - path to output directory
     */
    _shouldFolderBeCreated(outputDir) {
        // this returns absolute path
        // handle absolute path, that points to project
        const isAbsolutePathWithProjectRoot = outputDir.includes(process.cwd());
        // if output is inside the folder, we're all good
        const isPathWithinProjectRoot = !outputDir.startsWith('/');
        return isAbsolutePathWithProjectRoot ||
        isPathWithinProjectRoot ||
        false;
    }
    /**
     * To create output folder, we need to understand,
     * which folders to create. This function normalizes
     * relative and absolute path, to output we can then
     * work with - e.g.: folder1/folder2/folder3
     * @param String outputDir - path to outpurDirectory
     */
    _normalizeOutputDir(outputDir) {
        const removedRelativePrefix = outputDir.replace(/^\.\//, '');
        const removeAbsolutePrefix = removedRelativePrefix.replace(process.cwd(), '');
        return removeAbsolutePrefix;
    }
}

module.exports = Chunks2JsonWebpackPlugin;
