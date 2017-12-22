import { Connection } from 'typeorm';
import { Household } from '../entities'

const faker = require('faker');

import config from '../config';
import { props, join, compose } from 'ramda';

const fullName = compose(join(' '), props(['firstName', 'lastName']));

const createHousehold = (i) => ({
  nominatorId: 1,
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  dob: faker.date.past().toString(),
  race: faker.random.arrayElement(config.raceOptions),
  gender: faker.random.arrayElement(config.genders),
  email: faker.internet.email(),
  last4ssn: ('000' + faker.random.number(9999)).slice(-4),
  preferred_contact_method: faker.random.arrayElement(['phone', 'email']),
  draft: false,
  approved: i % 5 !== 0
});

export default async (connection: Connection, verbose = true) => {
    const repo = connection.getRepository(Household);

    for (let i = 1; i < 25; i++) {

        const household = createHousehold(i);
    
        if (verbose) {
          console.log(`Seeding household ${fullName(household)}`);
        }
        await repo.create(household);
      }
}
