import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Login } from './modules/login/Login';

import { connect } from 'unistore/react';
import { Register } from './modules/register/Register';

const ProtectedRoute = ({ component: Component, isLoggedIn, path, ...rest }) =>
  isLoggedIn === true ? <Component {...rest} /> : <Redirect to="/login" />;

const AppRouter = connect('isLoggedIn')(({ isLoggedIn }) => (
  <Router>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
));

export default () => (
  <div className="c">
    <AppRouter />
  </div>
);
