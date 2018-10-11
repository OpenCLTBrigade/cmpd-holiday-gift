import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FaqView, HomeView, VolunteerView } from '../views';

const PrimaryLayoutRoutes: React.SFC<{}> = _props => {
  return (
    <Switch>
      <Route component={VolunteerView} path={`/volunteer`} />
      <Route component={FaqView} path={`/faq`} />
      <Route component={HomeView} />
    </Switch>
  );
};

export default PrimaryLayoutRoutes;
