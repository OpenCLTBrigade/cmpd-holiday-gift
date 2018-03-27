import { Connection } from 'typeorm';
import User from '../../entities/user';

export const authProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken']
  }
];
