import { createConnection } from 'typeorm';
import config from '../config';
import Affiliation from '../apps/nominations/models/affiliation'
import Attachment from '../apps/nominations/models/attachment'
import Household from '../apps/nominations/models/household'
import PhoneNumber from '../apps/nominations/models/phone-number'
import Address from '../apps/nominations/models/address'
import Child from '../apps/nominations/models/child'
import User from '../apps/nominations/models/user'
import AuthUser from '../apps/auth/user'

async function connect({db: {dialect: type, storage: database, logging, ...rest}}) {
  
  return await createConnection({type, database, entities: [Affiliation, AuthUser, User, Attachment, Household, PhoneNumber, Address, Child]});
}



export default async function() {
  return await connect(config)
}