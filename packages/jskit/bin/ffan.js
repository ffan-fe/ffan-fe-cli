#!/usr/bin/env node

//var isFfanScript = (__dirname.indexOf("/node_modules/ffan") !== -1)
//require('babel-register')({
//  only   : isFfanScript ? /ffan/ : undefined,
//})
require('babel-polyfill')

var argv = require('minimist')(process.argv.slice(2))
var create = require('../lib/create')
create = create.default || create
create(argv)
