import * as admin from 'firebase-admin';
const serviceAccount = require('../../../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://passwordless-auth-a5939.firebaseio.com'
});

export default admin;
