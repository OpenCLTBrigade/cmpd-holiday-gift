import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import NotFound from '../notFound';
import * as slips from './slips';

export function AuthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/slips/packing" component={slips.packing} />
        <Route path="/slips/bicycle" component={slips.bicycle} /> }
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
