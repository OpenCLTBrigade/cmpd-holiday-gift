var process = require('process');
var path = require('path');
var merge = require('deepmerge');

// Default values here can be overridden by env_shared.js and env_{environment}.js files
var config = {};

if (process.env.NODE_ENV === 'production') {
    config.mode = 'production';
    config.port = 3000;
    config.db = {
        dialect: 'mysql',
        host: 'localhost',
        // TODO: load user/password/database from secrets file
        user: 'expressuser',
        password: 'express123',
        database: 'expresstest'
    };
    // TODO: Setup configuration for using Amazon SES in production

    config.verboseAccessLog = false;
    config.useCompression = false; // TODO: enable compression on reverse proxy
    config.enableHotReload = false;
    config.verboseSeed = false;
    config.buildAssets = true;
} else if (process.env.NODE_ENV === 'testing') {
    config.mode = 'testing';
    config.port = 0;
    config.db = {
        dialect: 'sqlite',
        storage: path.join(__dirname, `../run/test/db.${process.pid}.sqlite`)
    };
    config.useCompression = false;
    config.enableHotReload = false;
    config.verboseSeed = false;
    config.verboseAccessLog = false;
    config.verbose = false;
    config.buildAssets = false;
} else { // development
    config.mode = 'development';
    config.port = process.env.PORT || 3000;
    config.db = {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../run/db.development.sqlite')
    };
    config.verboseAccessLog = true;
    config.useCompression = true;
    config.enableHotReload = true;
    config.verboseSeed = true;
    config.verbose = true;
    config.buildAssets = true;
}

// Shared values (You can change these for testing by creating an env_shared.js file)

/*
 * Use env_(development/testing/production).js to specify
 * host, port, user, pass
 */
config.email = {
    from_address: 'noreply@codeforcharlotte.org',
    from_name: 'noreply',
    admin_address: 'info@codeforcharlotte.org',
    subjects: {
        confirm_email: 'Please confirm your email address',
        new_user_needs_approval: 'A new user needs approval',
        account_activated: 'Your account has been activated'
    }
};

config.db.logging = false;

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

config.run = path.join(__dirname, '../run');

// Load overrides
let env_vars, env_shared;

try {
    env_shared = require('./env_shared.js');
} catch (err) {
    env_shared = {};
    console.log('NOTICE: Missing or invalid env_shared.js');
}

try {
    env_vars = require (`./env_${config.mode}.js`);
} catch (err) {
    env_vars = {};
    console.log(`WARNING: Invalid or missing env_${config.mode}.js file found!`);
  // console.log('More details:', err)
}

module.exports = merge.all([config, env_shared, env_vars]);
