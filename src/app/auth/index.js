// @flow

import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Login from './login';
import Logout from './logout';
import Register from './register';

// Assets used by this component
import logo from './assets/auth-logo.png';

const AuthHeader = styled.div`
    width: 360px;
    margin: 10px auto;
    text-align: center;
}
`;

const MadeBy = styled.div`
  font-size: 180%;
  color: #6da1e4;
  position: relative;
  top: -10px;
  font-weight: bold;
`;

export default class Auth extends React.Component<{}> {
  render(): React.Node {
    return (
      <div className="auth-wrapper">
        <AuthHeader>
          <img src={logo} title="CMPD Explorers Christmas Project" alt="CMPD Explorers Christmas Project" />
          <MadeBy>By Code for Charlotte</MadeBy>
        </AuthHeader>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/logout" component={Logout} />
        <Route exact path="/auth/register" component={Register} />
      </div>
    );
  }
}
