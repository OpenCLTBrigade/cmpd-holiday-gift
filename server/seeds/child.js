const faker = require('faker');

const config = require('../config');

module.exports = async db => {
  // Add ten children to the DB
  for (let i = 0; i < 55; i++) {
    await db.child.create({
      'household_id': faker.random.number(48) + 1,
      'name_first': faker.name.firstName(),
      'name_middle': faker.name.firstName(),
      'name_last': faker.name.lastName(),
      'dob': faker.date.past(18),
      'race': faker.random.arrayElement(config.raceOptions),
      'last4ssn': ('000' + faker.random.number(9999)).slice(-4),
      'free_or_reduced_lunch': faker.random.boolean(),
      'reason_for_nomination': faker.lorem.text(300),
      'school_id': faker.random.number({ min: 60, max: 160 }),
      'bike_want': faker.random.boolean(),
      'bike_size': faker.random.arrayElement(config.bikeSizes),
      'bike_style': faker.random.arrayElement(config.bikeStyles),
      'clothes_want': faker.random.boolean(),
      'clothes_size_shirt': faker.random.arrayElement(config.clothesSizes),
      'clothes_size_pants': faker.random.arrayElement(config.clothesSizes),
      'shoe_size': '' + faker.random.number({ min: 1, max: 9 }),
      'favourite_colour': faker.random.arrayElement(['Red', 'Blue', 'Green', 'Orange']),
      'interests': faker.lorem.text(30),
      'additional_ideas': faker.lorem.text(50)
    });
  }
};
