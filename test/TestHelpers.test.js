const Chunks2JsonPlugin = require('../');

describe('TestHelpers', () => {
    const pluginInstance = new Chunks2JsonPlugin();
    it(`It should allow creating folder inside project root`, (done) => { 
        expect(pluginInstance._shouldFolderBeCreated('./any-folder/output')).toEqual(true);
        expect(pluginInstance._shouldFolderBeCreated('any-folder/output/')).toEqual(true);
        expect(pluginInstance._shouldFolderBeCreated(`${process.cwd()}any-folder/output`)).toEqual(true);
        done();
    });
    it(`It should prevent creating folder outside project root`, (done) => { 
        expect(pluginInstance._shouldFolderBeCreated('/any-folder/output')).toEqual(false);
        done();
    });
    it(`It should normalize absolute path`, (done) => { 
        expect(pluginInstance._normalizeOutputDir(`${process.cwd()}any-folder/output`)).toEqual('any-folder/output');
        done();
    });
    it(`It should normalize relative path`, (done) => { 
        expect(pluginInstance._normalizeOutputDir(`./any-folder/output`)).toEqual('any-folder/output');
        done();
    });
    it(`It should keep normalized path`, (done) => { 
        expect(pluginInstance._normalizeOutputDir(`any-folder/output`)).toEqual('any-folder/output');
        done();
    });
});