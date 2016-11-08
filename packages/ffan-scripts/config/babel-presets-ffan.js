
import {dirname} from 'path'
const resolve = require.resolve

module.exports = {
  "presets": [
    resolve('babel-preset-latest'),
    resolve('babel-preset-react'),
    resolve('babel-preset-stage-3'),
  ],
  "plugins": [
    [resolve('babel-plugin-transform-runtime'), {
      "regenerator": true,
      // https://github.com/babel/babel/pull/3612
      moduleName: dirname(resolve('babel-runtime/package'))
    }]
  ]
}

