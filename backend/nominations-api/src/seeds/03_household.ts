import { Connection } from 'typeorm';
import { Household } from 'cmpd-common-api';

const faker = require('faker');

import config from '../config';
import { props, join, compose } from 'ramda';

const fullName = compose(join(' '), props(['firstName', 'lastName']));

const createHousehold = i => ({
  nominatorId: 1,
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  dob: faker.date.past().toString(),
  race: faker.random.arrayElement(config.raceOptions),
  gender: faker.random.arrayElement(config.genders),
  email: faker.internet.email(),
  last4ssn: ('000' + faker.random.number(9999)).slice(-4),
  preferredContactMethod: faker.random.arrayElement(['phone', 'email']),
  draft: false,
  nominationEmailSent: false,
  reviewed: false,
  deleted: false,
  approved: i % 5 !== 0
});

export default async (connection: Connection, verbose = true) => {
  try {
    for (let i = 1; i <= 25; i++) {
      const household = Household.fromJSON(createHousehold(i));

      await household.save();

      if (verbose) {
        console.log(`Seeded household ${fullName(household)}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
