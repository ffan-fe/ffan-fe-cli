#!/usr/bin/env node

require('babel-register');

var run = require('../scripts/run').default;
var start = require('../scripts/start');

run(start);

