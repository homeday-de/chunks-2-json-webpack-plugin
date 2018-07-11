# chunks-2-json-webpack-plugin
Plugin for webpack 4, that outputs build files to JSON

## Instalation 

```
npm i --save-dev chunks-2-json-webpack-plugin
```

## Use case

Webpack is a great tool and has witout a doubt revolutionized the way we build frontend applications. However usually, due to the caching strategy, chunck files will have hash appended to their file name. And if you want to use yoru build in an env, that does not know 
anything about this, it becomes complicated to inject the build in your app.

Therefore this plugin was build, as it will output your chunks in a JSON file, that will 
allow other apps to understand the structure of the build. 


## Usage example

#### Input

```javascript
const Chunks2JsonPlugin = require('chunks-2-json-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new Chunks2JsonPlugin({ outputDir: 'dist/', filename: 'my-app.json' })
        ]
    }
}
```

#### Output

```JSON
{
  "chunk-vendors": {
    "js": "/js/chunk-vendors.fc40696c.js",
    "jsMap": "/js/chunk-vendors.fc40696c.js.map"
  },
  "app": {
    "css": "dist/css/app.eb829ccc.css",
    "js": "/dist/js/app.dd31cdcb.js",
    "jsMap": "/dist/js/app.dd31cdcb.js.map"
  }
}
```

## Questions? 

Feel free to open an issue. 