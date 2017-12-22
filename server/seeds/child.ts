const faker = require('faker');

import config from '../config';
import { Connection } from 'typeorm';
import {Child} from '../entities';

export default async (connection: Connection) => {
  const repo = connection.getRepository(Child)
  // Add ten children to the DB
  for (let i = 0; i < 55; i++) {
    await repo.create({
      'householdId': faker.random.number(25) + 1,
      'firstName': faker.name.firstName(),
      'middleName': faker.name.firstName(),
      'lastName': faker.name.lastName(),
      'dob': faker.date.past(18),
      'race': faker.random.arrayElement(config.raceOptions),
      'last4ssn': ('000' + faker.random.number(9999)).slice(-4),
      'freeOrReducedLunch': faker.random.boolean(),
      'reasonForNomination': faker.lorem.text(300),
      'schoolId': faker.random.number({ min: 60, max: 160 }),
      'wantsBike': faker.random.boolean(),
      'bikeSize': faker.random.arrayElement(config.bikeSizes),
      'bikeStyle': faker.random.arrayElement(config.bikeStyles),
      'wantsClothes': faker.random.boolean(),
      'clothesShirtSize': faker.random.arrayElement(config.clothesSizes),
      'clothesPantsSize': faker.random.arrayElement(config.clothesSizes),
      'clothesCoatSize': faker.random.arrayElement(config.clothesSizes),
      'shoeSize': '' + faker.random.number({ min: 1, max: 9 }),
      'favouriteColor': faker.random.arrayElement(['Red', 'Blue', 'Green', 'Orange']),
      'interests': faker.lorem.text(30),
      'additionalIdeas': faker.lorem.text(50)
    });
  }
};
