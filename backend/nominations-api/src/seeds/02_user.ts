import { props, join, compose } from 'ramda';
import { Connection } from 'typeorm';
const faker = require('faker');

import { Nominator } from 'cmpd-common-api';

const fullName = compose(join(' '), props(['firstName', 'lastName']));

const createUser = (props = {}): Partial<Nominator> => ({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  phoneNumber: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  affiliationId: faker.random.number({ min: 1, max: 57 }),
  nominationLimit: 5,
  disabled: false,
  role: 'nominator',
  ...props
});

export default async (_: Connection, verbose = true) => {
  for (let i = 0; i < 5; i++) {
    const user = createUser();

    const entity = Nominator.fromJSON(user);

    await entity.save();

    if (verbose) {
      console.log(`Seeded user ${fullName(entity)}`);
    }
  }

  const developer = Nominator.fromJSON({
    id: faker.random.uuid(),
    name: 'Developer',
    phoneNumber: '+15555555555',
    email: 'developer@codeforcharlotte.org',
    affiliationId: 1,
    nominationLimit: 1000000,
    disabled: false,
    role: 'admin'
  } as any);

  await developer.save();

  const nominator = Nominator.fromJSON({
    id: 'abc1234',
    name: 'Nominator',
    phoneNumber: '+15555555555',
    email: 'nominator@codeforcharlotte.org',
    affiliationId: 2,
    nominationLimit: 5,
    disabled: false,
    role: 'nominator'
  });

  await nominator.save();

  const notApproved = Nominator.fromJSON({
    id: faker.random.uuid(),
    name: 'NotYetApproved',
    phoneNumber: '+15555555555',
    affiliationId: 1,
    nominationLimit: 5,
    disabled: false,
    email: 'notapproved@codeforcharlotte.org',

    role: 'nominator'
  });

  await notApproved.save();

  const denied = Nominator.fromJSON({
    id: faker.random.uuid(),
    name: 'Unapproved',
    phoneNumber: '+15555555555',
    affiliationId: 1,
    nominationLimit: 5,
    disabled: true,
    email: 'unapproved@codeforcharlotte.org',

    role: 'nominator'
  });

  await denied.save();
};
