import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {AuthToken} from 'lib/auth'

// TODO: add support for required roles
export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: !AuthToken.expired()};
    var {component, ...rest} = this.props;
    this.component = component;
    this.rest = rest;
    // TODO ATN: listen to login/logout events
  }
  render() {
    var Component = this.component;
    return (
      <Route
        {...this.rest}
        render={props =>
          this.state.authenticated === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />}
      />
    );
  }
}
