import * as React from 'react';
import { Route } from 'react-router-dom';
import { HomeView } from '../views';

const PrimaryLayoutRoutes: React.SFC<{}> = _props => {
  return <Route component={HomeView} />;
};

export default PrimaryLayoutRoutes;
