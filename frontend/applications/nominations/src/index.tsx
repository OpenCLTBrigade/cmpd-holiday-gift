// This is the main entry point of our application.
// It tells WebPack what resources to load (css / fonts / etc) and creates the base routes for
// our main modules such as the Dashboard and the Authentication-related screens.
// Load core stuffs
import 'unfetch/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
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
import { useAuth } from './contexts/Auth';
import { AuthenticatedApp } from './app/AuthenticatedApp';
import { UnauthenticatedApp } from './app/UnauthenticatedApp';
import AppProviders from './contexts';

//TODO: use lerna to grab this dep.

function AppRouter() {
  const auth = useAuth();

  return auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
