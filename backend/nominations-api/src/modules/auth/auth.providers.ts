import { User } from 'cmpd-common-api';
import { Connection } from 'typeorm';

export const authProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken']
  }
];
