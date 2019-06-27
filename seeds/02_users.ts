import { props, join, compose } from 'ramda';
import faker from 'faker';

import firebase from './util';

import config from '../backend/common/src/config';

const fullName = compose(join(' '), props(['firstName', 'lastName']));
type FirebaseAccount = typeof specialAccounts[0];

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
    phoneNumber: '+10009999999',
    email: 'nominator@codeforcharlotte.org',
    affiliationId: 2,
    nominationLimit: 5,
    disabled: false,
    role: 'nominator'
  }
];

const createUser = (props = {}) => ({
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

const createFirebaseAuthUser = async (account: FirebaseAccount) => {
  try {
    const user = await firebase.auth().getUserByEmail(account.email);

    if (user) {
      console.log('Updating existing user');
      await firebase.auth().updateUser(user.uid, {
        displayName: account.name,
        email: account.email,
        password: account.email,
        disabled: false,
        emailVerified: true
      });
      await firebase.auth().setCustomUserClaims(user.uid, {
        claims: {
          admin: { [account.role]: true, approved: true },
          nominations: { [account.role]: true, approved: true }
        }
      });
    }

    return user;
  } catch (error) {
    console.log('Creating new user in firebase');

    const { name, email, phoneNumber, role } = account;

    const user = await firebase
      .auth()
      .createUser({ displayName: name, email, phoneNumber, password: email, emailVerified: true });
    await firebase.auth().setCustomUserClaims(user.uid, {
      claims: {
        [role]: true,
        admin: { [role]: true },
        nominations: { [role]: true }
      }
    });

    return user;
  }
};

const seedSpecialAccounts = async () => {
  console.log('Seed special accounts');

  for (const account of specialAccounts) {
    const user = await createFirebaseAuthUser(account);

    await firebase
      .firestore()
      .collection('users')
      .add(account);
  }

  console.log('Seeded special accounts');

  return specialAccounts;
};

export default async (_?, verbose = false) => {
  for (let i = 0; i < 5; i++) {
    const user = createUser();

    await firebase
      .firestore()
      .collection('users')
      .add(user);

    if (verbose) {
      console.log(`Seeded user ${fullName(user)}`);
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
  console.log('Seeding households');

  try {
    const db = firebase.firestore();
    const batch = db.batch();

    for (let i = 1; i <= 25; i++) {
      const household = createHousehold({ index: i, nominatorId });

      var ref = db.collection('households').doc();
      batch.set(ref, household);

      if (verbose) {
        console.log(`Seeded household ${fullName(household)}`);
      }
    }

    await batch.commit();

    console.log('Seeded households');
  } catch (error) {
    console.error(error);
  }
};
