var process = require('process');
var path = require('path');
var vm = require('vm');
var fs = require('fs');

// Default config values can be overridden by ../../env.js

if (fs.existsSync(path.join(__dirname, '../run'))) {
  console.error('Refusing to run: detected presence of `server/run/`. The `run/` folder should be moved to the root of the repository');
  process.exit(1);
}

if (fs.existsSync(path.join(__dirname, '../env.js'))) {
  console.error('Refusing to run: detected presence of `server/env.js`. The `env.js` file should be moved to the root of the repository');
  process.exit(1);
}

var config = {};

config.run = path.join(__dirname, '../../run');
config.pid = process.pid;

var customEnvFile = path.join(__dirname, '../../env.js');

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
} else if (process.env.NODE_ENV === 'testing') {
  config.mode = 'testing';
  customEnvFile = require.resolve('./env.testing.js');
} else if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  config.mode = 'development';
} else {
  console.error(`Unknown value for NODE_ENV: ${process.env.NODE_ENV}`);
}

var defaultConfig = path.join(__dirname, 'env.default.js');

vm.runInNewContext(fs.readFileSync(defaultConfig), config, {
  filename: defaultConfig,
  displayErrors: true
});

var code;
try {
  code = fs.readFileSync(customEnvFile);
} catch (e) {
  console.warn(`Warning: missing ${customEnvFile} file`);
}

if (code) {
  vm.runInNewContext(fs.readFileSync(customEnvFile), config, {
    filename: config.customEnvFile,
    displayErrors: true
  });
}

module.exports = config;
