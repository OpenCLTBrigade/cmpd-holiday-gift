import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import NotFound from './notFound';
import Dashboard from './dashboard';
import "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "admin-lte/dist/css/AdminLTE.css";
import "admin-lte/dist/css/skins/skin-blue.css";

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function authenticated () {
  return true;
}

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <PrivateRoute authed={authenticated()} path='/dashboard' component={Dashboard} />
      <Route exact path="/login" component={App} />
      <Route exact path="/register" component={App} />
      <Route exact path="/password-reset" component={App} />
      {/* TODO: Better redirect handling for auth */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
registerServiceWorker();
