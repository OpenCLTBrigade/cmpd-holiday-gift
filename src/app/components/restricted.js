// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthToken } from 'lib/auth';

export default function Restricted<Props: {location: mixed}>(
  Wrapped: Class<React.Component<Props>>
): Class<React.Component<Props, {authenticated: boolean}>> {
  return class Restricted extends React.Component<Props, {authenticated: boolean}> {
    constructor() {
      super();
      this.state = { authenticated: !AuthToken.expired() };
      // TODO: listen for login/logout events
    }

    render(): React.Node {
      if (!this.state.authenticated) {
        return <Redirect to={{ pathname: '/auth/login', state: { from: this.props.location } }} />;
      } else {
        return <Wrapped {...this.props}/>;
      }
    }
  };
}
