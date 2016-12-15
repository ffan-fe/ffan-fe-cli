#!/usr/bin/env node

//var isFfanScript = (__dirname.indexOf("/node_modules/create-ffan-fe") !== -1)
//require('babel-register')({
//  only   : isFfanScript ? /create-ffan-fe/ : undefined,
//})
require('babel-polyfill')

var argv = require('minimist')(process.argv.slice(2))
var create = require('../lib/create')
create = create.default || create
create(argv)
