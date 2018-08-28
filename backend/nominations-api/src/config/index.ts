import * as fs from 'fs';
import * as path from 'path';
// Default config values can be overridden by ../../env.js

// const config = require('./env.default.js');
// const envPath = path.join(process.cwd(), 'env.js');
// let customize = config => {};
// if (process.env.NODE_ENV === 'testing') {
//   customize = require('./env.testing.js');
// } else if (fs.existsSync(envPath)) {
//   customize = require(envPath);
//   if (typeof customize !== 'function') {
//     console.error(
//       'Your `env.js` does not export a function.',
//       'Please upgrade or fix `env.js`.',
//       'See `env.example.js` for a working example.'
//     );
//     process.exit(1);
//   }
// }

// customize(config);

export { default } from './config';
