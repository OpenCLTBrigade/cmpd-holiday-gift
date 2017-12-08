/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');

const db = require('../models');
import config from '../config';

async function seed() {
  await db.sync();
  let seq = Promise.resolve();
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
