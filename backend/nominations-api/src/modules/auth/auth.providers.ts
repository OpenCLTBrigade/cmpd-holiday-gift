import { Connection } from 'typeorm';
import { Nominator } from 'cmpd-common-api';

export const authProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Nominator),
    inject: ['DbConnectionToken']
  }
];
