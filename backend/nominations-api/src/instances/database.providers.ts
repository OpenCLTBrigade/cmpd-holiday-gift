import {
  Address,
  Affiliation,
  Attachment,
  Child,
  Household,
  Nominator,
  PhoneNumber,
  Session,
  User
} from 'cmpd-common-api';
import { createConnection } from 'typeorm';
import { AutoEncryptSubscriber } from 'typeorm-encrypted';
import config from '../config';

const { db: { dialect: type, storage: database } } = config;

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type,
        database,
        entities: [Affiliation, Nominator, User, Session, Attachment, Household, PhoneNumber, Address, Child],
        subscribers: [AutoEncryptSubscriber]
      })
  }
];
