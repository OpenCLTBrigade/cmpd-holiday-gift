import faker from 'faker';

import firebase from './util';
import config from '../backend/common/src/config';

function createChild(householdId) {
  return {
    householdId,
    firstName: faker.name.firstName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dob: faker.date.past(18).toString(),
    race: faker.random.arrayElement(config.raceOptions),
    last4ssn: ('000' + faker.random.number(9999)).slice(-4).toString(),
    freeOrReducedLunch: faker.random.boolean(),
    reasonForNomination: faker.lorem.text(300),
    wantsBike: faker.random.boolean(),
    bikeSize: faker.random.arrayElement(config.bikeSizes),
    bikeStyle: faker.random.arrayElement(config.bikeStyles),
    wantsClothes: faker.random.boolean(),
    clothesShirtSize: faker.random.arrayElement(config.clothesSizes),
    clothesPantsSize: faker.random.arrayElement(config.clothesSizes),
    clothesCoatSize: faker.random.arrayElement(config.clothesSizes),
    shoeSize: faker.random.number({ min: 1, max: 9 }).toString(),
    favouriteColor: faker.random.arrayElement(['Red', 'Blue', 'Green', 'Orange']),
    interests: faker.lorem.text(50),
    gender: faker.random.boolean()
  };
}

export default async (connection?) => {
  console.log('Seeding household children');

  try {
    const db = firebase.firestore();
    const households = await db.collection('households').get();
    const batch = db.batch();

    for (const household of households.docs) {
      for (let i = 0; i < 3; i++) {
        const child = createChild(household.id);

        var ref = db.collection('household_children').doc();
        batch.set(ref, child);
      }
    }

    await batch.commit();

    console.log('Seeding household children');
  } catch (error) {
    console.error(error);
  }
};
