import { props, join, compose } from 'ramda';
import { Connection } from 'typeorm';
const faker = require('faker');

import auth from '../apps/lib/auth';

import { User } from '../entities';

const fullName = compose(join(' '), props(['firstName', 'lastName']));

const createUser = (props = {}) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  affiliationId: faker.random.number({ min: 1, max: 57 }),
  email: faker.internet.email(),
  password: auth.hashPassword('admin'),
  nominationLimit: 5,
  active: true,
  confirmationEmail: true,
  approved: true,
  role: 'nominator',
  ...props
});

export default async (connection: Connection, verbose = true) => {
  for (let i = 0; i < 5; i++) {
    const user = createUser();

    const entity = User.fromJSON(user);

    await entity.save();

    if (verbose) {
      console.log(`Seeded user ${fullName(entity)}`);
    }
  }

  const developer = User.fromJSON({
    firstName: 'Developer',
    lastName: 'lastName',
    affiliationId: 1,
    email: 'developer@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nominationLimit: 1000000,
    active: true,
    approved: true,
    role: 'admin'
  });

  await developer.save();

  const nominator = User.fromJSON({
    firstName: 'Nominator',
    lastName: 'Account',
    affiliationId: 2,
    email: 'nominator@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nominationLimit: 5,
    active: true,
    approved: true,
    role: 'nominator'
  });

  await nominator.save();

  const notApproved = User.fromJSON({
    firstName: 'NotYetApproved',
    lastName: 'Account',
    affiliationId: 1,
    email: 'notyetapproved@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nominationLimit: 5,
    active: true,
    approved: false,
    role: 'nominator'
  });

  await notApproved.save();

  const denied = User.fromJSON({
    firstName: 'Unapproved',
    lastName: 'Account',
    affiliationId: 1,
    email: 'unapproved@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nominationLimit: 5,
    active: false,
    approved: false,
    role: 'nominator'
  });

  await denied.save();

  const deactivated = User.fromJSON({
    firstName: 'Deactivated',
    lastName: 'Account',
    affiliationId: 1,
    email: 'deactivated@codeforcharlotte.org',
    password: auth.hashPassword('admin'),
    nominationLimit: 5,
    active: false,
    approved: true,
    role: 'nominator'
  });

  await deactivated.save();
};
