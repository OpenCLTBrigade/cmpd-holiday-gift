import { Connection } from 'typeorm';
import { Address } from '../entities';
const faker = require('faker');

export default async (connection: Connection) => {
  for (let i = 0; i < 25; i++) {
    const address = new Address();

    address.householdId = i + 1;
    address.type = 'home';
    address.street = faker.address.streetAddress('###');
    address.street2 = i % 7 === 0 ? faker.address.secondaryAddress() : '';
    address.city = i % 8 === 0 ? faker.address.city() : 'Charlotte';
    address.state = i % 8 === 0 ? faker.address.stateAbbr() : 'NC';
    address.zip = faker.address.zipCode();

    await address.save();
  }
};
