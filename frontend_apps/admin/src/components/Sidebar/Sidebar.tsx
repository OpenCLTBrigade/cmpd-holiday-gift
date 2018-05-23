import * as React from 'react';
import { NavLink } from 'react-router-dom';
import dashboardRoutes from '../../routes/dashboard';
import HeaderLinks from '../Header/HeaderLinks';

class Sidebar extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: 'url(img/sidebar-1.jpg)'
    };
    return (
      <div id="sidebar" className="sidebar" data-color="black">
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a href="#" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={'https://avatars1.githubusercontent.com/u/4162073?s=60&v=4'} alt="logo_image" />
            </div>
          </a>
          <span className="simple-text logo-normal">CMPD Explorers</span>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop: any, key) => {
              if (!prop.redirect)
                return (
                  <li className={prop.upgrade ? 'active active-pro' : this.activeRoute(prop.path)} key={key}>
                    <NavLink to={prop.path} className="nav-link" activeClassName="active">
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
