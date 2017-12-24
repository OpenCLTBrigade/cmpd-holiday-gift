const faker = require('faker');

import config from '../config';
import { Connection } from 'typeorm';
import { Child } from '../entities';

export default async (connection: Connection) => {

  
  // Add 25 children to the DB
  for (let i = 0; i < 5; i++) {

    const child = new Child();

    child.householdId = faker.random.number(25) + 1;
    child.firstName = faker.name.firstName();
    child.middleName = faker.name.firstName();
    child.lastName = faker.name.lastName();
    child.dob = faker.date.past(18).toString();
    child.race = faker.random.arrayElement(config.raceOptions);
    child.last4ssn = '' + ('000' + faker.random.number(9999)).slice(-4);
    child.freeOrReducedLunch = faker.random.boolean();
    child.reasonForNomination = faker.lorem.text(300);
    child.householdId = faker.random.number({ min: 60, max: 160 });
    child.wantsBike = faker.random.boolean();
    child.bikeSize = faker.random.arrayElement(config.bikeSizes);
    child.bikeStyle = faker.random.arrayElement(config.bikeStyles);
    child.wantsClothes = faker.random.boolean();
    child.clothesShirtSize = faker.random.arrayElement(config.clothesSizes);
    child.clothesPantsSize = faker.random.arrayElement(config.clothesSizes);
    child.clothesCoatSize = faker.random.arrayElement(config.clothesSizes);
    child.shoeSize = '' + faker.random.number({ min: 1, max: 9 });
    child.favouriteColor = faker.random.arrayElement(['Red', 'Blue', 'Green', 'Orange']);
    child.interests = faker.lorem.text(30);
    child.interests = faker.lorem.text(50);
    child.gender = faker.random.boolean();

    await child.save();
  }
};
