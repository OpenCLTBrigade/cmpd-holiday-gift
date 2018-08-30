import {
  Address,
  Affiliation,
  Attachment,
  Child,
  Household,
  Nominator,
  PhoneNumber,
  Session
  } from 'cmpd-common-api';
import * as fs from 'fs';
import { createConnection } from 'typeorm';
import { AutoEncryptSubscriber } from 'typeorm-encrypted';
import config from '../config';
/* eslint no-console: "off" */
const path = require('path');


async function seed({ db: { dialect: type, storage: database } }: any) {
  try {
    const connection = await createConnection({
      type,
      database,
      synchronize: true,
      entities: [Nominator, Affiliation, Address, Attachment, Child, PhoneNumber, Household, Session],
      subscribers: [AutoEncryptSubscriber]
    });

    let seq = Promise.resolve();
    const seedFiles = fs.readdirSync(__dirname).filter(file => file.match(/.ts$/) && file !== 'index.ts');

    for (const file of seedFiles) {
      if (config.verboseSeed) {
        seq = seq.then(() => console.log(`* Seeding from ${file}`));
      }

      await import(path.join(__dirname, file))
        .then(({ default: seed }) => seed(connection, config.verboseSeed))
        .then(() => console.log(`finished seeding ${file}`));
    }
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

if (require.main === module) {
  seed(config);
}

module.exports = seed;
