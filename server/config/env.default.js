// Default values for configuration options. These settings can be
// modified in ../env.js

/* eslint no-undef: "off" */

// Web app settings
port = 3001;
useCompression = true;

// Verbosity
enableAccessLog = true;
verboseAccessLog = true;
verboseSeed = false;
verbose = true;

// Default local sqlite detabase
db = {
  dialect: 'sqlite',
  storage: `${run}/db.development.sqlite`,
  logging: false
};

// Email settings
email = {
  fromAddress: 'noreply@codeforcharlotte.org',
  fromName: 'noreply', // TODO: nicer from_name?
  adminAddress: 'info@codeforcharlotte.org',
};

// Secrets
jwtSecrets = {
  auth: '452e39e25362a0d03914',
  nominations: 'd4d1709e5ed2fb32ae56564'
};
databaseEncryptionKey = '53E19CAB12F077ECDCC03C01BC621C8E950F9198C568A41A6DFDCE2E2D155469';
appTokenLifetime = '10m';
authTokenLifetime = '1d';

// TODO: these enums should not be in the config file

raceOptions = [
  'American Indian',
  'Alaskan Native',
  'Asian',
  'African American',
  'Hispanic',
  'Pacific Islander',
  'White',
  'Other'
];

bikeSizes = [
  'Tricycle',
  '12” Bicycle',
  '16” Bicycle',
  '20” Coaster Brake Bicycle',
  '20” Geared Bicycle',
  '24” Geared Bicycle'
];

clothesSizes = ['S', 'M', 'L'];

bikeStyles = ['Mountain', 'BMX', 'Tricycle'];

genders = ['F', 'M'];
