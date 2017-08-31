/* eslint no-console: "off" */

const faker = require('faker');

const config = require('../config');

module.exports = async (db, verbose) => {
  for (let i = 1; i < 50; i++) {
    if (verbose) {
      console.log(`Seeding household ${i}`);
    }
    await db.household.create({
      nominator_id: 1,
      name_first: faker.name.firstName(),
      name_middle: faker.name.firstName(),
      name_last: faker.name.lastName(),
      nominator_user_id: 1,
      dob: faker.date.past().toString(),
      race: faker.random.arrayElement(config.raceOptions),
      gender: faker.random.arrayElement(config.genders),
      email: faker.internet.email(),
      last4ssn: ('000' + faker.random.number(9999)).slice(-4),
      preferred_contact_method: faker.random.arrayElement(['phone', 'email']),
      draft: false,
      approved: i % 5 !== 0
    });
  }
};
