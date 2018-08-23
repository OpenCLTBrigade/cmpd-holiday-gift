import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'unistore/react';
import App from './App';
import firebase from './modules/common/firebase';
import { baseStore as store } from './modules/common/state';

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
