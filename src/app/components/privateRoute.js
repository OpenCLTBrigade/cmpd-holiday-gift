import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthToken } from 'lib/auth';

type ComponentProps<Props> = Props & {
  component: React.Component<any, Props, any>
};


// TODO: add support for required roles
export default class PrivateRoute<Props: {}> extends React.Component<*, *, *> {
  props: ComponentProps<Props>
  sate: {
    authenticated: boolean
  }
  component: React.Component<any, Props, any>
  rest: Props
  constructor(props: ComponentProps<Props>) {
    super(props);
    this.state = { authenticated: !AuthToken.expired() };
    var { component, ...rest } = this.props;
    this.component = component;
    this.rest = rest;
    // TODO: listen for login/logout events
  }
  render(): React.Element<any> {
    return (
      <Route
        {...this.rest}
        render={props =>
          this.state.authenticated === true
            ? <this.component {...props} />
            : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />}
      />
    );
  }
}
