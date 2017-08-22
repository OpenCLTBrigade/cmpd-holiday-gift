// @flow
import * as React from 'react';

export default class Header extends React.Component<{}> {
  componentWillMount() {}

  toggleNavCollapsed = () => {
    let body: ?HTMLElement = document.querySelector('body');
    if (!(body instanceof HTMLElement)) {
      throw new Error('Expected to find sidebar element.');
    }
    body.classList.toggle('sidebar-collapse');
    body.classList.toggle('sidebar-open');
  };

  render(): React.Node {
    return (
      <header className="main-header">
        <a href="/" className="logo">
          Home
        </a>
        <nav className="navbar navbar-static-top" onClick={this.toggleNavCollapsed}>
          <a className="sidebar-toggle">
            <span className="sr-only">Toggle</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user">
                <a>
                  <span className="hidden-xs">
                    TODO: Name
                  </span>
                </a>
              </li>
              <li className="dropdown user user-menu">
                <a href="/auth/logout">
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
