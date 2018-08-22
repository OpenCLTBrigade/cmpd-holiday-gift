import createStore from 'unistore';
import firebase from './firebase';

export const LoginStatus = {
  Unknown: 'unknown',
  Authenticated: 'authenticated',
  Unauthenticated: 'unauthenticated'
};

export const store = createStore({
  loginStatus: LoginStatus.Unknown,
  currentUser: undefined
});

export const actions = _ => ({
  updateLoginStatus(loginStatus) {
    return { loginStatus };
  }
});

firebase.auth().onAuthStateChanged(async user => {
  if (user && user.emailVerified) {
    const currentUser = await firebase.auth().currentUser;
    store.setState({ loginStatus: LoginStatus.Authenticated, currentUser });
  } else {
    store.setState({ loginStatus: LoginStatus.Unauthenticated, currentUser: undefined });
  }
});
