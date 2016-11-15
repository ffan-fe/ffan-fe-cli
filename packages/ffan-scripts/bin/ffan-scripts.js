#!/usr/bin/env node

require('babel-register')
require('babel-polyfill')

var run = require('../scripts/run').default

var scripts = {
  start : require('../scripts/start'),
  build : require('../scripts/build'),
  //test  : require('../scripts/test'),
  deploy: require('../scripts/deploy'),
}

var argv = require('minimist')(process.argv.slice(2))
var commands = argv._
var script = scripts[commands[0]]

if (script) {
  run(script)
} else {
  console.log('-- invalid script --\n\n')
}
