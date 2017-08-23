const faker = require('faker');

const auth = require('../apps/lib/auth');

module.exports = async db => {
  for (let i = 0; i < 5; i++) {
    await db.user.create({
      name_first: faker.name.firstName(),
      name_last: faker.name.lastName(),
      affiliation_id: faker.random.number({ min: 1, max: 57 }),
      email: faker.internet.email(),
      password: auth.hashPassword('admin'),
      nomination_limit: 5,
      active: true,
      confirmed_email: true,
      approved: true,
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
    active: true,
    approved: true,
    role: 'admin'
  });

  await db.user.create({
    name_first: 'Nominator',
    name_last: 'Account',
    affiliation_id: 2,
    email: 'nominator@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 5,
    active: true,
    approved: true
  });

  await db.user.create({
    name_first: 'NotYetApproved',
    name_last: 'Account',
    affiliation_id: 1,
    email: 'notyetapproved@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 5,
    active: true,
    approved: false
  });

  await db.user.create({
    name_first: 'Unapproved',
    name_last: 'Account',
    affiliation_id: 1,
    email: 'unapproved@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 5,
    active: false,
    approved: false
  });

  await db.user.create({
    name_first: 'Deactivated',
    name_last: 'Account',
    affiliation_id: 1,
    email: 'deactivated@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nomination_limit: 5,
    active: false,
    approved: true
  });
};
