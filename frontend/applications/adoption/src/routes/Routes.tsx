import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrimaryLayout } from '../layouts/PrimaryLayout';
export const Routes: React.SFC<{}> = _props => {
  return (
    <Router>
      <Switch>
        <Route component={PrimaryLayout} />
      </Switch>
    </Router>
  );
};

export default Routes;
