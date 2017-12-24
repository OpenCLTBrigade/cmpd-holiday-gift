import { Connection } from 'typeorm';
import { Household } from '../entities';

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
  const repo = connection.getRepository(Household);

  try {
    for (let i = 1; i < 25; i++) {
      const household = createHousehold(i);

      const house = new Household();

      house.firstName = household.firstName;
      house.middleName = household.middleName;
      house.lastName = household.lastName;
      house.dob = household.dob;
      house.race = household.race;
      house.gender = household.gender;
      house.email = household.email;
      house.last4ssn = household.last4ssn;
      house.preferredContactMethod = household.preferredContactMethod;
      house.draft = household.draft;
      house.nominationEmailSent = household.nominationEmailSent;
      house.reviewed = household.reviewed;
      house.deleted = household.deleted;
      house.approved = household.approved;
      house.nominatorId = household.nominatorId;

      house.save();

      // await Household.create(house);

      if (verbose) {
        console.log(`Seeded household ${fullName(household)}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
