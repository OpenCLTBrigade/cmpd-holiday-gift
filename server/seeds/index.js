/* eslint no-console: "off" */

var fs = require('fs');
var path = require('path');

var db = require('../models');
var config = require('../config');

async function seed() {
    await db.sequelize.sync();
    var seq = Promise.resolve();
    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return file.match(/.js$/) && (file !== 'index.js');
        })
        .forEach(async function (file) {
            if (config.verboseSeed) {
                seq = seq.then(() => console.log(`* Seeding from ${file}`));
            }
            seq = seq.then(() => require(path.join(__dirname, file))(db, config.verboseSeed));
        });
    await seq;
}

if (require.main === module) {
    seed();
}

module.exports = seed;
