const Chunks2JsonPlugin = require('../');

describe('TestHelpers', () => {
    const pluginInstance = new Chunks2JsonPlugin();

    afterEach(() => {
        jest.clearAllMocks();
    });

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

    describe(`Logging the output file`, () => {
        it(`It should log by default`, (done) => {
            jest.spyOn(console, 'log').mockImplementation(() => {});
            pluginInstance._showLogFile(`my_file.json`);

            expect(console.log).toBeCalledWith(expect.stringContaining(`my_file.json`));
            done();
        });

        it(`It should not log when show log is false`, (done) => {
            const pluginInstance = new Chunks2JsonPlugin({
                showLog: false
            });

            jest.spyOn(console, 'log').mockImplementation(() => {});
            pluginInstance._showLogFile(`my_file.json`);

            expect(console.log).not.toBeCalled();
            done();
        });
    });
});
