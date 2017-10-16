// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Home from './home';
import HouseholdIndex from './household/householdIndex.js';
import NewHousehold from './household/new-household';
import ShowHousehold from './household/ShowHousehold';
import { AffiliationList, Affiliation } from './affiliations';
import UsersList from './users/UsersList';
import PendingUsersList from './users/PendingUsersList';
import { NewUser, ViewUser, EditUser } from './users';
import { getMe } from '../../api/user';

const ContentTitle = (): React.Node =>
  <section className="content-header">
    <h1>Header</h1>
  </section>;

export default class Dashboard extends React.Component<{location: mixed}, {user: any}> {
  // TODO: Return AdminLTE base template and register sub-routes here
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  componentDidMount() {
    getMe().then(response => {
      const s = { ...this.state };
      s.user = response.data;
      this.setState(s);
    });
  }

  render(): React.Node {
    const { user } = this.state;

    return (
      <div className="wrapper">
        <Header user={ user } />
        <Sidebar user={ user }/>
        <div className="content-wrapper">
          <ContentTitle />
          <section className="content">
            <Switch location={this.props.location}>
              <Route exact path="/dashboard" component={() => <Home user={user}/>} />
              {/* TODO: Finish routes */}
              <Route exact path="/dashboard/household" component={HouseholdIndex} />
              <Route exact path="/dashboard/household/create" component={NewHousehold} />
              <Route exact path="/dashboard/household/show/:id" component={ShowHousehold} />
              <Route exact path="/dashboard/household/edit/:id" component={NewHousehold} />
              <Route exact path="/dashboard/affiliation" component={AffiliationList} />
              <Route exact path="/dashboard/affiliation/:affiliation_id" component={Affiliation} />
              <Route exact path="/dashboard/user" component={UsersList} />
              <Route exact path="/dashboard/user/pending" component={PendingUsersList} />
              <Route exact path="/dashboard/user/create" component={NewUser} />
              <Route exact path="/dashboard/user/:user_id/edit" component={EditUser} />
              <Route exact path="/dashboard/user/:user_id" component={ViewUser} />
            </Switch>
          </section>
        </div>
      </div>
    );
  }
}
