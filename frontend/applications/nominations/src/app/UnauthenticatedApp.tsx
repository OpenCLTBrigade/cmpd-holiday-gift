import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';

export function UnauthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
}
