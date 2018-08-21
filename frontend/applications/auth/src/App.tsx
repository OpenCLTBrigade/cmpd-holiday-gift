import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Login } from './modules/login/Login';

import { Register } from './modules/register/Register';
import { Registered } from './modules/register/Registered';
import { Authenticated } from './modules/login/Authenticated';

import { Provider, connect } from 'unistore/react';
import { store } from './modules/common/state';
import Container from './modules/components/Container';

const AppRouter = connect('accountStatus')(({ accountStatus }) => (
  <Router basename="/auth">
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/register/:phoneNumber" component={Register} />
      <Route path="/registered" component={Registered} />
    </div>
  </Router>
));

export default () => (
  <Provider store={store}>
    <Container>
      <AppRouter />
    </Container>
  </Provider>
);
