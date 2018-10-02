import firebase from '../firebase';
import { formatNumber } from '../util/formatters';

const authUrl = 'http://localhost:3002/api/v2/auth';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: firebase.auth.ConfirmationResult;
  }
}

export const sendEmailVerification = async () => {
  const user = firebase.auth().currentUser;

  if (user) {
    await user.sendEmailVerification();
  }
};

export const loginWithCode = async code => {
  try {
    if (code) {
      await window.confirmationResult.confirm(code);
      const idToken: string = await firebase.auth().currentUser.getIdToken(true);
      return idToken;
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const verifyPhoneNumber = async phone => {
  try {
    if (phone) {
      const response = await fetch(`${authUrl}/verify/${phone}`);
      return response.status === 200;
    }
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const register = async ({ name, displayName = name, phoneNumber, ...registerData }) => {
  try {
    if (registerData) {
      const response = await fetch(`${authUrl}/register`, {
        body: JSON.stringify({ name, displayName, phoneNumber: formatNumber(phoneNumber), ...registerData }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        method: 'POST'
      });
    }
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const login = async phone => {
  try {
    if (phone) {
      await firebase
        .auth()
        .signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
        });
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const logout = () =>
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email);
  } else {
    console.log('not logged in');
  }
});
