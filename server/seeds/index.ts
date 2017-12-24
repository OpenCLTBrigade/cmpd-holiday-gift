/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');
import config from '../config';
import {
  Affiliation,
  Address,
  Attachment,
  Child,
  PhoneNumber,
  Household,
  User,
  Session
} from '../entities';

import { createConnection } from 'typeorm';
import { AutoEncryptSubscriber } from 'typeorm-encrypted';

async function seed({ db: { dialect: type, storage: database } }) {
  const connection = await createConnection({
    type,
    database,
    synchronize: true,
    entities: [
      Affiliation,
      Address,
      Attachment,
      Child,
      PhoneNumber,
      Household,
      User, 
      Session
    ],
    subscribers: [AutoEncryptSubscriber]
  });

  let seq = Promise.resolve();
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return file.match(/.ts$/) && file !== 'index.ts';
    })
    .forEach(async function(file) {
      if (config.verboseSeed) {
        seq = seq.then(() => console.log(`* Seeding from ${file}`));
      }
      seq = seq.then(() => {
        return import(path.join(__dirname, file)).then(({ default: seed }) =>
          seed(connection, config.verboseSeed)
        );
      });
    });
  await seq;
}

if (require.main === module) {
  seed(config);
}

module.exports = seed;
