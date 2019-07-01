import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import { useAuth } from '../../contexts/Auth';

import Header from './header';
import Sidebar from './sidebar';
import Home from './home';
import EditHousehold from './household/EditHousehold';
import ShowHousehold from './household/ShowHousehold';
import { AffiliationList, Affiliation } from './affiliations';
import UsersList from './users/UsersList';
import PendingUsersList from './users/PendingUsersList';
import { NewUser, ViewUser, EditUser } from './users';
import { Households } from './household/Households';

export function Dashboard(props: RouteComponentProps) {
  const { user, claims } = useAuth();

  return (
    <div className="wrapper">
      <Header user={user} />
      <Sidebar user={user} />
      <div className="content-wrapper">
        {/* <ContentTitle /> */}
        <section className="content">
          <Switch location={props.location}>
            <Route exact path="/dashboard" render={() => <Home user={user} />} />
            {/* Needs Redux */}
            <Route exact path="/dashboard/household" render={rest => <Households />} />
            <Route exact path="/dashboard/household/create" render={rest => <EditHousehold user={user} {...rest} />} />
            <Route
              exact
              path="/dashboard/household/show/:id"
              render={rest => <ShowHousehold claims={claims} householdId={rest.match.params.id} />}
            />
            <Route
              exact
              path="/dashboard/household/edit/:id"
              render={rest => <EditHousehold user={user} {...rest} />}
            />
            <Route exact path="/dashboard/affiliation" render={rest => <AffiliationList user={user} {...rest} />} />
            <Route
              exact
              path="/dashboard/affiliation/:affiliationId"
              render={rest => <Affiliation user={user} {...rest} />}
            />
            <Route exact path="/dashboard/user" render={rest => <UsersList user={user} {...rest} />} />
            <Route exact path="/dashboard/user/pending" render={rest => <PendingUsersList user={user} {...rest} />} />
            <Route exact path="/dashboard/user/create" render={rest => <NewUser user={user} {...rest} />} />
            <Route exact path="/dashboard/user/:user_id/edit" render={rest => <EditUser user={user} {...rest} />} />
            <Route exact path="/dashboard/user/:user_id" render={rest => <ViewUser user={user} {...rest} />} />
          </Switch>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
