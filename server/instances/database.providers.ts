import { createConnection } from 'typeorm';
import config from '../config';
import Affiliation from '../entities/user'
import Attachment from '../entities/user'
import Household from '../entities/user'
import PhoneNumber from '../entities/user'
import Address from '../entities/user'
import Child from '../entities/user'
import User from '../entities/user'
import AuthUser from '../entities/user'

const {db: {dialect: type, storage: database}} = config;

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({type, database, entities: [Affiliation, AuthUser, User, Attachment, Household, PhoneNumber, Address, Child]})
    }
]