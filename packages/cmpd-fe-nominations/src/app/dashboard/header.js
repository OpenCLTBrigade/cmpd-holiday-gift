import * as React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default class Header extends React.Component {
  componentWillMount() {}

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
                <a>
                  {user && (
                    <span className="hidden-xs">
                      {user.name_first} {user.name_last.substring(0, 1).toUpperCase()}.
                    </span>
                  )}
                </a>
              </li>
              <li className="dropdown user user-menu">
                <Link to="/auth/logout">
                  <i className="fa fa-sign-out" />Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
