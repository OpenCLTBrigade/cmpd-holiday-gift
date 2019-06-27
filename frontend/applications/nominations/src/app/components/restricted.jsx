import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthToken } from '../../lib/auth';

export default function Restricted(Wrapped) {
  return class Restricted extends React.Component {
    // dropHandler: ?() => void;
    constructor() {
      super();
      this.state = { authenticated: !AuthToken.expired() };
    }

    UNSAFE_componentWillMount() {
      // TODO: this will not catch events while the component is unmounted
      this.dropHandler = AuthToken.addHandler(event => {
        this.setState({ authenticated: event === 'login' });
      });
    }

    componentWillUnmount() {
      if (this.dropHandler) {
        this.dropHandler();
        this.dropHandler = null;
      }
    }

    render() {
      if (!this.state.authenticated) {
        return (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: this.props.location }
            }}
          />
        );
      } else {
        return <Wrapped {...this.props} />;
      }
    }
  };
}
