import {
  Address,
  Affiliation,
  Attachment,
  Child,
  Household,
  PhoneNumber,
  Session,
  User
  } from 'cmpd-common-api';
import { createConnection } from 'typeorm';
import { AutoEncryptSubscriber } from 'typeorm-encrypted';
import config from '../config';
/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');

async function seed({ db: { dialect: type, storage: database } }) {
  try {
    const connection = await createConnection({
      type,
      database,
      synchronize: true,
      entities: [User, Affiliation, Address, Attachment, Child, PhoneNumber, Household, Session],
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
          return import(path.join(__dirname, file)).then(({ default: seed }) => seed(connection, config.verboseSeed));
        });
      });
    await seq;
  } catch (error) {
    console.log(error);
  }
}

if (require.main === module) {
  seed(config);
}

module.exports = seed;
