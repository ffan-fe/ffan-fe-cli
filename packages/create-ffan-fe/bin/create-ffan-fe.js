#!/usr/bin/env node

var isFfanScript = (__dirname.indexOf("/node_modules/create-ffan-fe") !== -1)

require('babel-polyfill')
require('babel-register')({
  //only: isFfanScript  ? /create-ffan-fe/ : undefined
})

var argv = require('minimist')(process.argv.slice(2))

var create = require('../src/create')

create = create.default || create

create(argv)
