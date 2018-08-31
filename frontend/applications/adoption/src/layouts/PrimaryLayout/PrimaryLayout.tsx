import * as React from 'react';
import { Navigation } from '../../components/Navigation';
import { PrimaryLayoutRoutes } from '../../routes';

const PrimaryLayout: React.SFC<{}> = _props => {
  return (
    <React.Fragment>
      <Navigation />
      <PrimaryLayoutRoutes />
    </React.Fragment>
  );
};

export default PrimaryLayout;
