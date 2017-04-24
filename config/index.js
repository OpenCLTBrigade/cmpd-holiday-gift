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
} else {
    config.mode = 'development';
    config.port = process.env.PORT || 3000;
    config.db = {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../.db.development.sqlite')
    };
}

config.verboseAccessLog = true;

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

module.exports = config;
