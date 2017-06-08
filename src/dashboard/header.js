import React from 'react'

export default class Header extends React.Component {
  render () {
    let {props} = this;

    return (
      <header className="main-header">
        <a href="/" className="logo">
          Home
        </a>
        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user">
                <a href="#" >
                  <span className="hidden-xs">
                    TODO: Name
                  </span>
                </a>
              </li>
              <li className="dropdown user user-menu">
                <a href="/logout">
                  <i className="fa fa-sign-out"></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
