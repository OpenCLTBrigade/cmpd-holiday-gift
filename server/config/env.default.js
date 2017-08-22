// @flow

// Default values for configuration options. These settings can be
// modified in ../env.js

const path = require('path');

export type ConfigType = {|
  jwtSecrets: { [string]: string },
  authTokenLifetime: string,
  appTokenLifetime: string,
  run: string,
  email: $TODO,
  port: number,
  db: $TODO,
  enableAccessLog: boolean,
  verboseAccessLog: boolean,
  verboseSeed: boolean,
  useCompression: boolean,
  verbose: boolean,
  pid: number,
  mode: string,
  databaseEncryptionKey: string,
  raceOptions: string[],
  bikeSizes: string[],
  clothesSizes: string[],
  bikeStyles: string[],
  genders: string[]
|};

const config: $Shape<ConfigType> = {};

// Runtime settings
config.run = path.join(__dirname, '../../run');
config.pid = process.pid;

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
} else if (process.env.NODE_ENV === 'testing') {
  config.mode = 'testing';
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
  config.mode = 'development';
} else {
  console.error(`Unknown value for NODE_ENV: ${process.env.NODE_ENV}`);
}


// Web app settings
config.port = 3001;
config.useCompression = true;

// Verbosity
config.enableAccessLog = true;
config.verboseAccessLog = true;
config.verboseSeed = false;
config.verbose = true;

// Default local sqlite detabase
config.db = {
  dialect: 'sqlite',
  storage: `${config.run}/db.development.sqlite`,
  logging: false
};

// Email settings
config.email = {
  fromAddress: 'noreply@codeforcharlotte.org',
  fromName: 'noreply', // TODO: nicer from_name?
  adminAddress: 'info@codeforcharlotte.org',
};

// Secrets
config.jwtSecrets = {
  auth: '452e39e25362a0d03914',
  nominations: 'd4d1709e5ed2fb32ae56564'
};
config.databaseEncryptionKey = '53E19CAB12F077ECDCC03C01BC621C8E950F9198C568A41A6DFDCE2E2D155469';
config.appTokenLifetime = '10m';
config.authTokenLifetime = '1d';

// TODO: these enums should not be in the config file

config.raceOptions = [
  'American Indian',
  'Alaskan Native',
  'Asian',
  'African American',
  'Hispanic',
  'Pacific Islander',
  'White',
  'Other'
];

config.bikeSizes = [
  'Tricycle',
  '12” Bicycle',
  '16” Bicycle',
  '20” Coaster Brake Bicycle',
  '20” Geared Bicycle',
  '24” Geared Bicycle'
];

config.clothesSizes = ['S', 'M', 'L'];

config.bikeStyles = ['Mountain', 'BMX', 'Tricycle'];

config.genders = ['F', 'M'];

module.exports = ((config: any): ConfigType);
