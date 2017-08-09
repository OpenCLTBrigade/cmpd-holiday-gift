var faker = require('faker');

var auth = require('../apps/lib/auth');

module.exports = async db => {
  for (var i = 0; i < 5; i++) {
    await db.user.create({
      name_first: faker.name.firstName(),
      name_last: faker.name.lastName(),
      affiliation_id: faker.random.number({ min: 1, max: 57 }),
      email: faker.internet.email(),
      password: auth.hashPassword('admin'),
      nomination_limit: 5,
      active: 'N',
      confirmed_email: 'Y',
      approved: 'Y',
      role: 'nominator'
    });
  }

  await db.user.create({
    name_first: 'Developer',
    name_last: 'lastName',
    affiliation_id: 1,
    email: 'developer@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 1000000,
    active: 'Y',
    role: 'admin'
  });

  await db.user.create({
    name_first: 'Nominator',
    name_last: 'Account',
    affiliation_id: 2,
    email: 'nominator@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 5,
    active: 'Y'
  });
};
