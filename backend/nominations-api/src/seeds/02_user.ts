import { props, join, compose } from 'ramda';
import { Connection } from 'typeorm';
const faker = require('faker');

import { Nominator, Household } from 'cmpd-common-api';
import firebase from '../common/services/firebase';
import config from '../config';

const fullName = compose(join(' '), props(['firstName', 'lastName']));
const specialAccounts = [
  {
    id: faker.random.uuid(),
    name: 'Developer',
    phoneNumber: '+10000000000',
    email: 'developer@codeforcharlotte.org',
    affiliationId: 1,
    nominationLimit: 1000000,
    disabled: false,
    role: 'admin'
  },
  {
    id: faker.random.uuid(),
    name: 'Nominator',
    phoneNumber: '+19999999999',
    email: 'nominator@codeforcharlotte.org',
    affiliationId: 2,
    nominationLimit: 5,
    disabled: false,
    role: 'nominator'
  }
];

const createUser = (props = {}): Partial<Nominator & { role? }> => ({
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

const createFirebaseUser = async account => {
  try {
    return await firebase.auth().getUserByEmail(account.email);
  } catch (error) {
    const { name, email, phoneNumber, role } = account;

    return await firebase.auth().createUser({ displayName: name, email, phoneNumber, emailVerified: true });
  }
};

const seedSpecialAccounts = async () => {
  const accounts = [];
  for (const account of specialAccounts) {
    if (config.seedFirebase) {
      const user = await createFirebaseUser(account);
      const entity = Nominator.fromJSON({ ...account, id: user.uid });

      await entity.save();

      accounts.push(entity);
    }

    const entity = Nominator.fromJSON(account);

    await entity.save();

    accounts.push(entity);
  }

  return accounts;
};

export default async (_: Connection, verbose = false) => {
  for (let i = 0; i < 5; i++) {
    const user = createUser();

    const entity = Nominator.fromJSON(user);

    await entity.save();

    if (verbose) {
      console.log(`Seeded user ${fullName(entity)}`);
    }
  }

  const [developer] = await seedSpecialAccounts();

  await createHouseholds(developer.id);
};

const createHousehold = ({ index, nominatorId }) => ({
  nominatorId,
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  dob: faker.date.past().toString(),
  race: faker.random.arrayElement(config.raceOptions),
  gender: faker.random.arrayElement(config.genders),
  email: faker.internet.email(),
  last4ssn: ('000' + faker.random.number(9999)).slice(-4),
  preferredContactMethod: faker.random.arrayElement(['phone', 'email']),
  draft: false,
  nominationEmailSent: false,
  reviewed: false,
  deleted: false,
  approved: index % 5 !== 0
});

const createHouseholds = async (nominatorId, verbose = false) => {
  try {
    for (let i = 1; i <= 25; i++) {
      const household = Household.fromJSON(createHousehold({ index: i, nominatorId }));

      await household.save();

      if (verbose) {
        console.log(`Seeded household ${fullName(household)}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
