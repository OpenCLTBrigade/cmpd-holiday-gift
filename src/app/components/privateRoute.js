// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthToken } from 'lib/auth';

type ComponentProps<Props> = Props & {
  component: Class<React.Component<Props>>
};

// TODO: add support for required roles
export default class PrivateRoute<Props: {}> extends React.Component<ComponentProps<Props>, {authenticated: boolean}> {
  component: Class<React.Component<Props>>
  rest: Props
  constructor(props: ComponentProps<Props>) {
    super(props);
    this.state = { authenticated: !AuthToken.expired() };
    var { component, ...rest } = this.props;
    this.component = component;
    this.rest = rest;
    // TODO: listen for login/logout events
  }
  render(): React.Node {
    const Ch = this.component;
    return (
      <Route
        {...this.rest}
        render={props =>
          this.state.authenticated === true
            ? <Ch {...props} />
            : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />}
      />
    );
  }
}
