var process = require('process');
var path = require('path');


var config = {};

if (process.env.NODE_ENV == 'production') {
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
    config.verboseAccessLog = false;
    config.useCompression = false; // TODO: enable compression on reverse proxy
    config.enableHotReload = false;
    config.verboseSeed = false;
    config.buildAssets = true;
} else if (process.env.NODE_ENV == 'testing') {
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
