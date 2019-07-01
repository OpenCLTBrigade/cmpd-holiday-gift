import faker from 'faker';
import firebase from './util';

export default async (connection?) => {
  console.log('Seeding household phones');

  try {
    const db = firebase.firestore();

    const households = await db.collection('households').get();

    const batch = db.batch();

    for (const household of households.docs) {
      const phone = {
        householdId: faker.random.number(24) + 1,
        type: 'home',
        number: faker.phone.phoneNumberFormat().toString()
      };

      var ref = db.collection('households').doc(household.id);
      batch.update(ref, { phoneNumbers: [phone] });
    }
    await batch.commit();
    console.log('Seeding household phones');
  } catch (error) {
    console.error(error);
  }
};
