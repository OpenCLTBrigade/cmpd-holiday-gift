/* eslint no-console: "off" */

var fs = require('fs');
var path = require('path');

var db = require('../models');

var seq = db.sequelize.sync();

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return file.match(/.js$/) && (file !== 'index.js');
    })
    .forEach(async function (file) {
        seq.then(() => console.log(`Seeding from ${file}`))
            .then(() => require(path.join(__dirname, file))(db));
    });
