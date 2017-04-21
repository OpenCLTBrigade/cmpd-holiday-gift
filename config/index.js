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
    }
} else {
    config.mode = 'development';
    config.port = process.env.PORT || 3000,
    config.db = {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../.db.development.sqlite')
    };
}

module.exports = config;
