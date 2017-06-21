import React from 'react';

export default class Header extends React.Component {
  componentWillMount() {}

  toggleNavCollapsed() {
    document.querySelector('body').classList.toggle('sidebar-collapse');
    document.querySelector('body').classList.toggle('sidebar-open');
  }

  render() {
    return (
      <header className="main-header">
        <a href="/" className="logo">
          Home
        </a>
        <nav className="navbar navbar-static-top" role="navigation" onClick={() => this.toggleNavCollapsed()}>
          <a href="#" className="sidebar-toggle">
            <span className="sr-only">Toggle</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user">
                <a href="#">
                  <span className="hidden-xs">
                    TODO: Name
                  </span>
                </a>
              </li>
              <li className="dropdown user user-menu">
                <a href="/logout">
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
