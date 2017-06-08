import React from 'react'
import {  Route } from 'react-router-dom'
import Header from './header';
import Sidebar from './sidebar';
import Home from './home';

export default class Dashboard extends React.Component {

// TODO: Return AdminLTE base template and register sub-routes here
  render () {
    return (
      <div class="wrapper">
        <Header/>
        <Sidebar/>
        <Route exact path="/dashboard" component={Home} />
        {/* TODO: Finish routes */}
        {/* <Route exact path="/dashboard/household" component={Home} /> */}
        {/* <Route exact path="/dashboard/household/create" component={Home} /> */}
        {/* <Route exact path="/dashboard/household/edit/:id" component={Home} /> */}
      </div>
    )
  }
}
