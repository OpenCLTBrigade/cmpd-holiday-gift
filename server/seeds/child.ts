const faker = require('faker');

import config from '../config';
import { Connection } from 'typeorm';
import { Child } from '../entities';

export default async (connection: Connection) => {
  // Add 25 children to the DB
  for (let i = 0; i < 5; i++) {
    const child = Child.fromJSON({
      householdId: faker.random.number(25) + 1,
      firstName: faker.name.firstName(),
      middleName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dob: faker.date.past(18).toString(),
      race: faker.random.arrayElement(config.raceOptions),
      last4ssn: ('000' + faker.random.number(9999)).slice(-4).toString(),
      freeOrReducedLunch: faker.random.boolean(),
      reasonForNomination: faker.lorem.text(300),
      wantsBike: faker.random.boolean(),
      bikeSize: faker.random.arrayElement(config.bikeSizes),
      bikeStyle: faker.random.arrayElement(config.bikeStyles),
      wantsClothes: faker.random.boolean(),
      clothesShirtSize: faker.random.arrayElement(config.clothesSizes),
      clothesPantsSize: faker.random.arrayElement(config.clothesSizes),
      clothesCoatSize: faker.random.arrayElement(config.clothesSizes),
      shoeSize: faker.random.number({ min: 1, max: 9 }).toString(),
      favouriteColor: faker.random.arrayElement([
        'Red',
        'Blue',
        'Green',
        'Orange'
      ]),
      interests: faker.lorem.text(50),
      gender: faker.random.boolean()
    });

    await child.save();
  }
};
