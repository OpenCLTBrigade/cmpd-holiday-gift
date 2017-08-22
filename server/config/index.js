// @flow

const process = require('process');
const fs = require('fs');

import type { ConfigType } from './env.default.js';

// Default config values can be overridden by ../../env.js

const config: ConfigType = require('./env.default.js');

let customize: (ConfigType) => void = () => {};
if (process.env.NODE_ENV === 'testing') {
  customize = require('./env.testing.js');
} else if (fs.existsSync(require.resolve('../../env.js'))) {
  customize = require('../../env.js');
  if (typeof customize !== 'function') {
    console.error('Your `env.js` does not export a function.',
                  'Please upgrade or fix `env.js`.',
                  'See `env.example.js` for a working example.');
    process.exit(1);
  }
}

customize(config);

module.exports = config;
