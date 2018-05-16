import createStore, { Store } from 'unistore';
import { connect } from 'unistore/react';
import { register, sendEmailVerification } from './services/login';

type State = {
  count: number;
  accountStatus: 'authenticated' | 'registered';
};

export const store = createStore({
  count: 0,
  accountStatus: null
});

export const actions = (store: Store<State>) => ({
  up: () => store.setState(() => ({ count: store.getState().count + 1 })),
  down: () => store.setState(() => ({ count: store.getState().count - 1 })),

  async loginWithToken(token) {
    return { accountStatus: 'authenticated' };
  },

  async registerUser(state, userData) {
    console.log('step 1: register user');
    await register(userData);

    console.log('step 2: email verification');
    await sendEmailVerification();

    console.log('step 3: update account status');
    return { accountStatus: 'registered' };
  }
});
