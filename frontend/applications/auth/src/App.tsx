import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect, Provider } from 'unistore/react';
import { baseStore as store } from './modules/common/state';
import Container from './modules/components/Container';
import { Authenticated } from './modules/login/Authenticated';
import { Login } from './modules/login/Login';
import { Register } from './modules/register/Register';
import { Registered } from './modules/register/Registered';

const AppRouter = connect('accountStatus')(({ accountStatus }) => (
  <Router basename="/auth">
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/register/:phoneNumber" component={Register} />
      <Route path="/registered" component={Registered} />
    </div>
  </Router>
)) as any;

export default () =>
  (
    <Provider store={store}>
      <Container>
        <AppRouter />
      </Container>
    </Provider>
  ) as any;
