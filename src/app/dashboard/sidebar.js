// @flow
import React from 'react';

type SubMenuItemType = {
  url: string,
  title: string
};

type MenuItemType = {
  name?: string,
  url?: string,
  title: string,
  icon?: string,
  children?: Array<SubMenuItemType>
};

export default class Sidebar extends React.Component {
  menu: Array<MenuItemType>;

  constructor(props: Object) {
    super(props);
    this.menu = [
      {
        name: 'dashboard',
        url: '/',
        title: 'Dashboard',
        icon: 'fa fa-dashboard'
      },
      {
        name: 'households',
        title: 'Nominations',
        icon: 'fa fa-home',
        children: [
          {
            url: '/households',
            title: 'List Nominations'
          }
        ]
      }
    ];
  }

  toggleMenu(e: Object) {
    e.target.parentElement.classList.toggle('active');
  }

  render(): React.Element<*> {
    // TODO: Finish this
    // const navItems = this.menu.map(item => )
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          {/* <ul className="sidebar-menu">
            <li v-for="item in menu"
            :className="`${item.name == current_section ? 'active' : ''} ${item.children ? 'treeview' : ''}`">
              <a :href="item.url || '#'">
                <i v-if="item.icon" :className="item.icon"></i>
                {{item.title}}
                <i v-if="item.children" className="fa fa-angle-left pull-right"></i>
              </a>
              <ul v-if="item.children" className="treeview-menu">
                <li v-for="child in item.children" :className="child.name == current_section ? 'active' : ''">
                  <i :className="`${child.icon ? child.icon : 'fa fa-circle-o'}`"></i>
                  <a :href="child.url">{{child.title}}</a>
                </li>
              </ul>
            </li>
          </ul> */}
          <ul className="sidebar-menu">
            <li>
              <a>
                <i className="fa fa-dashboard fa-fw" /> Dashboard
              </a>
            </li>
            <li className="treeview">
              <a onClick={this.toggleMenu}>
                <i className="fa fa-home fa-fw" /> Nominations
                <i className="fa fa-angle-left pull-right" />{' '}
              </a>
              <ul className="treeview-menu">
                <li className="">
                  <a href="/dashboard/household/create">
                    <i className="fa fa-circle-o fa-fw" /> Nominate new Household
                  </a>
                </li>
                <li className="">
                  <a href="/dashboard/household">
                    <i className="fa fa-circle-o fa-fw" /> List nominations
                  </a>
                </li>
              </ul>
            </li>

            <li className="treeview">
              <a onClick={this.toggleMenu}>
                <i className="fa fa-users fa-fw" /> Users
                <i className="fa fa-angle-left pull-right" />{' '}
              </a>
              <ul className="treeview-menu">
                <li className="">
                  <a href="/dashboard/user/create">
                    <i className="fa fa-circle-o fa-fw" /> Add a User
                  </a>
                </li>
                <li className="">
                  <a href="/dashboard/user">
                    <i className="fa fa-circle-o fa-fw" /> Active Users
                  </a>
                </li>
                <li className="">
                  <a href="/dashboard/user/pending">
                    <i className="fa fa-circle-o fa-fw" /> Pending Registrations
                  </a>
                </li>
                <li className="">
                  <a href="/dashboard/affiliation">
                    <i className="fa fa-circle-o fa-fw" /> List Affiliations
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
