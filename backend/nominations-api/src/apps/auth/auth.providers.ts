import { Connection } from 'typeorm';
import { User } from 'cmpd-common-api';

export const authProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken']
  }
];
