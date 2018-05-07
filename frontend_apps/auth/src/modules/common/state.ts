import createStore, { Store } from 'unistore';
import { connect } from 'unistore/react';

type State = {
  count: number;
  isLoggedIn: boolean;
};

export const store = createStore({
  count: 0,
  isLoggedIn: false
});

export const actions = (store: Store<State>) => ({
  up: () => store.setState(() => ({ count: store.getState().count + 1 })),
  down: () => store.setState(() => ({ count: store.getState().count - 1 })),

  async loginWithToken(token) {
    store.setState(() => ({ isLoggedIn: true }));
  },

  async registerUser() {
    console.log('here');
  }
});
