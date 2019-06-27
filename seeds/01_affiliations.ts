import data from './data/affiliations';
import firebase from './util';

export default async (connection?, verbose = false) => {
  if (verbose) {
    console.log('Seeding Code for Charlotte');
  }

  try {
    const db = firebase.firestore();

    await db.collection('affiliations').add({
      type: 'cfc',
      name: 'Code for Charlotte',
      addressStreet: '1000 NC Music Factory Blvd',
      addressCity: 'Charlotte',
      addressState: 'NC',
      addressZip: '28206'
    });

    var batch = firebase.firestore().batch();

    for (const station of data.cmpdStations) {
      const ref = db.collection('affiliations').doc();
      batch.set(ref, {
        type: 'cmpd',
        ...station
      });
    }

    for (const station of data.cfdStations) {
      const ref = db.collection('affiliations').doc();
      batch.set(ref, {
        type: 'cfd',
        ...station
      });
    }

    for (const station of data.cmsSchools) {
      const ref = db.collection('affiliations').doc();
      batch.set(ref, {
        type: 'cms',
        ...station
      });
    }

    await batch.commit();
  } catch (e) {
    console.error(e);
  }
};
