// This is the main entry point of our application.
// It tells WebPack what resources to load (css / fonts / etc) and creates the base routes for
// our main modules such as the Dashboard and the Authentication-related screens.
// Load core stuffs
import 'unfetch/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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
import NotFound from './notFound';

import * as slips from './app/slips';

import { AuthToken } from './lib/auth';

//TODO: use lerna to grab this dep.
import Auth from '../../auth/src/App';
import { AuthConsumer, AuthProvider } from '../../auth/src/modules/common/contexts';
import { NotApproved } from '../../auth/src/modules/register/NotApproved';

const AppRouter = () => (
  <AuthConsumer>
    {({ accountStatus, claims }) => {
      const isApproved = claims && claims.nominations && claims.nominations.approved;

      if (['registered', 'unauthenticated', 'unregistered'].includes(accountStatus)) {
        return (
          <Router>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="*" component={() => <Redirect to="/auth" />} />
            </Switch>
          </Router>
        );
      }

      if (!isApproved) {
        return (
          <Router>
            <Switch>
              <Route path="/" component={NotApproved} />
              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </Router>
        );
      }

      return (
        accountStatus === 'authenticated' && (
          <Router>
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
    }}
  </AuthConsumer>
);

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
