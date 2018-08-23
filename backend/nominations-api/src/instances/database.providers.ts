import { Address, Affiliation, Attachment, Child, Household, Nominator, PhoneNumber, Session } from 'cmpd-common-api';
import { createConnection } from 'typeorm';
import { AutoEncryptSubscriber } from 'typeorm-encrypted';
import config from '../config';

const { db: { dialect: type, storage: database } } = config;

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: type as any,
        database,
        entities: [Affiliation, Nominator, Session, Attachment, Household, PhoneNumber, Address, Child],
        subscribers: [AutoEncryptSubscriber]
      })
  }
];
