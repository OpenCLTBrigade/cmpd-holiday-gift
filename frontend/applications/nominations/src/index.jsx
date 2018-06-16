// This is the main entry point of our application.
// It tells WebPack what resources to load (css / fonts / etc) and creates the base routes for
// our main modules such as the Dashboard and the Authentication-related screens.
// Load core stuffs
import * as React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'unistore/react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.css';

// Import core stylesheet
import './index.css';

// react-bootstrap-table
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import 'babel-polyfill';

// Our React Components that this component uses
import Dashboard from './app/dashboard';
import Auth from './app/auth';
import Restricted from './app/components/restricted';
import NotFound from './notFound';
import * as slips from './app/slips';

import { AuthToken } from './lib/auth';
import { store } from './lib/state';

const Routes = connect('loginStatus')(({ loginStatus }) => {
  //TODO: Need to check registration status & add referrer logic
  if (loginStatus === 'unauthenticated') {
    window.location = '/auth';
  }

  return (
    loginStatus === 'authenticated' && (
      <Router basename="/nominations/">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
          {AuthToken.expired() ? null : <Route path="/slips/packing" component={slips.packing} />}
          <Route path="/slips/bicycle" component={slips.bicycle} /> }
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  );
});

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
