import { Connection } from "typeorm";
import {Address} from '../entities'
const faker = require('faker');

export default async (connection: Connection) => {
  const repo = connection.getRepository(Address)
  for (let i = 0; i < 25; i++) {
    await repo.create({
      householdId: i + 1,
      type: 'home',
      street: faker.address.streetAddress('###'),
      street2: i % 7 === 0 ? faker.address.secondaryAddress() : '',
      city: i % 8 === 0 ? faker.address.city() : 'Charlotte',
      state: i % 8 === 0 ? faker.address.stateAbbr() : 'NC',
      zip: faker.address.zipCode()
    });
  }
}
