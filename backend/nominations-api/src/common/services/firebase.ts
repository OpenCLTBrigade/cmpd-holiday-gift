import * as admin from 'firebase-admin';

const serviceAccount = require('../../../service-account-key.json');

const makeFirebaseService = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://passwordless-auth-a5939.firebaseio.com'
  });

  return admin;
};

export default makeFirebaseService;

export type Admin = typeof admin;
