[![Build Status](https://travis-ci.com/homeday-de/chunks-2-json-webpack-plugin.svg?branch=master)](https://travis-ci.com/homeday-de/chunks-2-json-webpack-plugin) [![Coverage Status](https://coveralls.io/repos/github/homeday-de/chunks-2-json-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/homeday-de/chunks-2-json-webpack-plugin?branch=master)

# chunks-2-json-webpack-plugin
Plugin for webpack 4, that outputs build files to JSON. Without external dependencies.

## Instalation 

```
npm i --save-dev chunks-2-json-webpack-plugin
```

## Use case

Webpack is a great tool and has without a doubt revolutionized the way we build frontend applications. However usually, due to the (great) caching strategy, chunk files will have hash appended to their file name. And if you want to use your build in an env, that does not know 
anything about this, it becomes complicated to inject the build in your app.

Therefore this plugin was build, as it will output your chunks in a JSON file, that will 
allow other apps to understand the structure of the build. 

## Usage example

#### Input

```javascript

const Chunks2JsonPlugin = require('chunks-2-json-webpack-plugin');
const path = require('path');

const publicPath = '/app/';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath
  },
  plugins: [
    new Chunks2JsonPlugin({ outputDir: 'dist/', publicPath })
  ]
};

```

#### Output

```JSON
{
  "chunk-vendors": {
    "js": ["/app/js/chunk-vendors.fc40696c.js"],
    "js.map": ["/app/js/chunk-vendors.fc40696c.js.map"]
  },
  "app": {
    "css": ["/app/css/app.eb829ccc.css"],
    "js": ["/app/js/app.dd31cdcb.js"],
    "js.map": ["/app/js/app.dd31cdcb.js.map"]
  }
}
```


## Options

| Option | Description | Type | Default | Comment |
| ------------- |-------------| -------------| -------------| -------------| 
| **excludeFile** | Option to dynamically exclude some of the files | `RegExp` or `Function` with signature `(filename, chunk) => bool` | ` /\.hot-update\.js$/` |  Exclude HMR chunks by default (file names ending with `.hot-update.js`). |
| **chunkGroupName** | Option to define your own file chunk grouping. | `Function` with signature `(filename, chunk) => string` | `filename => /\.([a-z0-9]+(\.map)?)(\?.*)?$/.exec(filename)[1]` | Group by file extension (or `ext.map`) by default. For example for filename inside one chunk `dist/app.js` the default grouping will be `js: []` and for `dist/app.js.map` it would be `js.map: []` both inside of `app` key |
| **outputDir** | Output folder name. If the folder does not exist, we'll try to create it. | `String` | `process.cwd()` | Current working directory by default.  |
| **filename** | Output file name. | `String` | `build-manifest.json` | |
| **objectToString** | Function to be used to format the output. | `Function` with signature `(result) => string` | `result => JSON.stringify(result)` | By default we output `JSON`, but you can opt in for any other format as well. Just define your output here and adjust `filename`
| **publicPath** | String to prepend to all chunk file names. You probably should set it to the same value as `webpackConfig.output.publicPath`. | `String` | `''` | Empty string by default |

## Additional Info
To better understand your custom options, you can learn more about chunks [here](https://github.com/webpack/docs/wiki/how-to-write-a-plugin#exploring-assets-chunks-modules-and-dependencies).

## Questions? 
Feel free to open an [issue](https://github.com/homeday-de/chunks-2-json-webpack-plugin/issues). 


## Contribution or feature request? 
Please open a [PR](https://github.com/homeday-de/chunks-2-json-webpack-plugin/pulls) or [issue](https://github.com/homeday-de/chunks-2-json-webpack-plugin/issues).