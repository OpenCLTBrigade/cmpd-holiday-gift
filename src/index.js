// This is the main entry point of our application.
// It tells WebPack what resources to load (css / fonts / etc) and creates the base routes for
// our main modules such as the Dashboard and the Authentication-related screens.

// Load core stuffs
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.css';

// Font Awesome
import 'font-awesome/css/font-awesome.css';
import 'font-awesome/fonts/fontawesome-webfont.eot';
import 'font-awesome/fonts/fontawesome-webfont.ttf';
import 'font-awesome/fonts/fontawesome-webfont.woff';
import 'font-awesome/fonts/fontawesome-webfont.woff2';
import 'font-awesome/fonts/FontAwesome.otf';

// Import core stylesheet
import './index.css';

// react-bootstrap-table
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

// Our React Components that this component uses
import Dashboard from './dashboard';
import Auth from './auth';
import PrivateRoute from './components/privateRoute';

/**
 * TODO: Put in actual authentication checks
 * @return {boolean} Whether or not the user is authenticated
 */
function authenticated() {
  return true;
}

const Routes = props => (
  <Router {...props}>
    <Switch>
      <PrivateRoute authed={authenticated()} path="/dashboard" component={Dashboard} />
      {/* TODO: Change to !authenticated */}
      <PrivateRoute authed={authenticated()} path="/auth" component={Auth} />
      {/* TODO: 404 handler? */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
