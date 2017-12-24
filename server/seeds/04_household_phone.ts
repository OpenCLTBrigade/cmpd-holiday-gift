import { Connection } from 'typeorm';
import { PhoneNumber } from '../entities';

const faker = require('faker');

export default async (connection: Connection) => {
  for (let i = 0; i < 25; i++) {
    const number = PhoneNumber.fromJSON({
      householdId: faker.random.number(25) + 1,
      type: 'home',
      number: faker.phone.phoneNumberFormat().toString()
    });

    await number.save();
  }
};
