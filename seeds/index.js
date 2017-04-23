/* eslint no-console: "off" */

var fs = require('fs');
var path = require('path');

var db = require('../models');

var seeders = fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return file.match(/.js$/) && (file !== 'index.js');
    })
    .map(async function (file) {
        console.log(`Seeding from ${file}`);
        await require(path.join(__dirname, file))(db);
    });

db.sequelize.sync().then(Promise.all(seeders));
