import React from 'react';
import { render } from 'react-dom';

import firebase from './modules/common/firebase';
import { Provider, connect } from 'unistore/react';
import { store } from './modules/common/state';
import App from './App';

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
