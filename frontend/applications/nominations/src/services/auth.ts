import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD1RrSZga3qhleSUf9uiweZWkyK7zZspic',
  authDomain: 'cmpd-explorers-christmas.firebaseapp.com',
  databaseURL: 'https://cmpd-explorers-christmas.firebaseio.com',
  projectId: 'cmpd-explorers-christmas',
  storageBucket: 'cmpd-explorers-christmas.appspot.com',
  messagingSenderId: '575635321245'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
