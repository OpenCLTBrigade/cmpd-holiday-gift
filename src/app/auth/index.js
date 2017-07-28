// @flow

import React from 'react';
import { Route } from 'react-router-dom';

// Components
import Login from './login';
import Logout from './logout';
import Register from './register';

// Assets used by this component
import logo from './assets/auth-logo.png';

export default class Auth extends React.Component {
  render(): React.Element<any> {
    return (
      <div className="auth-wrapper">
        <div className="auth-header login-box">
          <img src={logo} title="CMPD Explorers Christmas Project" alt="CMPD Explorers Christmas Project"/>
          <div className="made-by">
            By Code for Charlotte
          </div>
        </div>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/logout" component={Logout} />
        <Route exact path="/auth/register" component={Register} />
      </div>
    );
  }
}
