import firebase from '../firebase';

declare global {
  interface Window {
    confirmationResult: firebase.auth.ConfirmationResult;
  }
}

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:58455/authenticate',
  // This must be true.
  handleCodeInApp: true
};

export const loginWithEmail = async email => {
  if (email) {
    await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);

    window.localStorage.setItem('emailForSignIn', email);
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

export const registerWithPhone = async phone => {
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
