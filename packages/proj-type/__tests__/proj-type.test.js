'use strict';

const projType = require('..');
const assert = require('assert').strict;

assert.strictEqual(projType(), 'Hello from projType');
console.info('projType tests passed');
