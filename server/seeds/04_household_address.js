const faker = require('faker');

module.exports = async db => {
  for (let i = 0; i < 45; i++) {
    await db['household_address'].create({
      household_id: i + 1,
      type: 'home',
      street: faker.address.streetAddress('###'),
      street2: i % 7 === 0 ? faker.address.secondaryAddress() : '',
      city: i % 8 === 0 ? faker.address.city() : 'Charlotte',
      state: i % 8 === 0 ? faker.address.stateAbbr() : 'NC',
      zip: faker.address.zipCode()
    });
  }
};
