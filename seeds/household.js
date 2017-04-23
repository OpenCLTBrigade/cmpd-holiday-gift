var faker = require('faker');

var config = require('../config');

module.exports = async db => {
    for (var i = 1; i < 50; i++) {
        await db.household.create({
            'nominatorId': 1,
            'name_first': faker.name.firstName(),
            'name_middle': faker.name.firstName(),
            'name_last': faker.name.lastName(),
            'dob': faker.date.past().toString(),
            'race': faker.random.arrayElement(config.raceOptions),
            'gender': faker.random.arrayElement(config.genders),
            'email': faker.internet.email(),
            'last4ssn': ('000' + faker.random.number(9999)).slice(-4),
            'preferred_contact_method': faker.random.arrayElement(['phone', 'email']),
            'draft': false
        });
    }
};
