'use strict';

const webCommon = require('..');
const assert = require('assert').strict;

assert.strictEqual(webCommon(), 'Hello from webCommon');
console.info('webCommon tests passed');
