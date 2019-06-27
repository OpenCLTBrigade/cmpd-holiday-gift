import faker from 'faker';
import firebase from './util';

const createAddress = i => {
  let address: any = {};

  address.householdId = i + 1;
  address.type = 'home';
  address.street = faker.address.streetAddress('###');
  address.street2 = i % 7 === 0 ? faker.address.secondaryAddress() : '';
  address.city = i % 8 === 0 ? faker.address.city() : 'Charlotte';
  address.state = i % 8 === 0 ? faker.address.stateAbbr() : 'NC';
  address.zip = faker.address.zipCode();

  return address;
};

export default async (connection?) => {
  console.log('Seeding addresses');
  try {
    const db = firebase.firestore();

    const households = await db.collection('households').get();

    const batch = db.batch();

    for (const household of households.docs) {
      const address = createAddress(household.id);
      var ref = db.collection('households').doc(household.id);
      batch.update(ref, { address });
    }

    await batch.commit();

    console.log('Seeded addresses');
  } catch (error) {
    console.error(error);
  }
};
