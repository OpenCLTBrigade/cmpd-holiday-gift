import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBpY3AtAAZDGGYKiVgyBAzaOhD4G1uhr9I',
  authDomain: 'passwordless-auth-a5939.firebaseapp.com',
  databaseURL: 'https://passwordless-auth-a5939.firebaseio.com',
  projectId: 'passwordless-auth-a5939',
  storageBucket: 'passwordless-auth-a5939.appspot.com',
  messagingSenderId: '1077907127009'
};
firebase.initializeApp(config);

export default firebase;
