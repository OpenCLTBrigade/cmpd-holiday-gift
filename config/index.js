var process = require('process');
var path = require('path');
var emailCreds = require('./email.js');


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
    config.email = {
      host: emailCreds.host,
      port: emailCreds.port,
      user: emailCreds.user,
      pass: emailCreds.pass
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
    config.email = {
      host: emailCreds.host,
      port: emailCreds.port,
      user: emailCreds.user,
      pass: emailCreds.pass,
      email_from_address: 'noreply@codeforcharlotte.org',
      email_admin_address: 'info@codeforcharlotte.org',
      mail_from_name: 'noreply',
      mail_confirm_email_subject: 'Please confirm your email address',
      mail_new_user_needs_approval_subject: 'A new user needs confirmation',
      mail_welcome_email_subject:'Your account has been activated'
    };
    config.verboseAccessLog = true;
    config.useCompression = true;
    config.enableHotReload = true;
    config.verboseSeed = true;
    config.verbose = true;
    config.buildAssets = true;
}

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

module.exports = config;
