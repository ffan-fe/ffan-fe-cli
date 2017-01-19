#!/usr/bin/env node

require('babel-polyfill')

var argv = require('minimist')(process.argv.slice(2))
var create = require('../lib/create')
create = create.default || create
create(argv)
