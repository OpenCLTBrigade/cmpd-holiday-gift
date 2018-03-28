import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthToken } from 'lib/auth';

// type ComponentProps<Props> = Props & {
//   component: Class<React.Component>
// };

// TODO: add support for required roles
export default class PrivateRoute extends React.Component {
  // component: Class<React.Component<Props>>;
  // rest: Props;
  constructor(props) {
    super(props);
    this.state = { authenticated: !AuthToken.expired() };
    const { component, ...rest } = this.props;
    this.component = component;
    this.rest = rest;
    // TODO: listen for login/logout events
  }
  render() {
    const Ch = this.component;
    const TheComponent =
      this.state.authenticated === true ? (
        <Ch />
      ) : (
        <Redirect to={{ pathname: '/auth/login', state: { from: this.props.location } }} />
      );

    return TheComponent;
  }
}
