const faker = require('faker');

module.exports = async db => {
  for (let i = 0; i < 55; i++) {
    await db['household_phone'].create({
      household_id: faker.random.number(48) + 1,
      type: 'home',
      number: faker.phone.phoneNumberFormat()
    });
  }
};
