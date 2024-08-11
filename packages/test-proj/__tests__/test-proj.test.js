'use strict';

const testProj = require('..');
const assert = require('assert').strict;

assert.strictEqual(testProj(), 'Hello from testProj');
console.info('testProj tests passed');
