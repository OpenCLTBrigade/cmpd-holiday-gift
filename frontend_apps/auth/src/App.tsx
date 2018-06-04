import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Login } from './modules/login/Login';

import { connect } from 'unistore/react';
import { Register } from './modules/register/Register';
import { Registered } from './modules/register/Registered';
import { Authenticated } from './modules/login/Authenticated';

const AppRouter = connect('accountStatus')(({ accountStatus }) => (
  <Router>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/authenticated" component={Authenticated} />

      <Route path="/register/:phoneNumber" component={Register} />
      <Route path="/registered/" component={Registered} />
    </div>
  </Router>
));

export default () => (
  <div className="c">
    <AppRouter />
  </div>
);
