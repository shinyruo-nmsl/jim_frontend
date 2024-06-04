'use strict';

const projService = require('..');
const assert = require('assert').strict;

assert.strictEqual(projService(), 'Hello from projService');
console.info('projService tests passed');
