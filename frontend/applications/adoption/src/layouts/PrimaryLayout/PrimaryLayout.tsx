import * as React from 'react';
import { PrimaryLayoutRoutes } from '../../routes';
import Logo from './components/Logo';
import { Navigation } from './components/Navigation';
// import './assets/css/bootstrap-theme.css';

const PrimaryLayout: React.SFC<{}> = _props => {
  return (
    <React.Fragment>
      <Logo />
      <Navigation />
      <PrimaryLayoutRoutes />
    </React.Fragment>
  );
};

export default PrimaryLayout;
