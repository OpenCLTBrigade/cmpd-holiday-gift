import * as React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../lib/firebase';

import './header.css';

export default class Header extends React.Component {
  UNSAFE_componentWillMount() {}

  toggleNavCollapsed = () => {
    const body = document.querySelector('body');
    if (!(body instanceof HTMLElement)) {
      throw new Error('Expected to find sidebar element.');
    }
    body.classList.toggle('sidebar-collapse');
    body.classList.toggle('sidebar-open');
  };

  render() {
    const { user } = this.props;

    return (
      <header className="main-header">
        <Link to="/" className="logo">
          CMPD Explorers
        </Link>
        <nav className="navbar navbar-static-top" onClick={this.toggleNavCollapsed}>
          <a className="sidebar-toggle">
            <span className="sr-only">Toggle</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user">
                <a>{user && <span className="hidden-xs">{user.name}</span>}</a>
              </li>
              <li className="dropdown user user-menu">
                <a href="#" onClick={() => firebase.auth().signOut()}>
                  <i className="fa fa-sign-out" />Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
