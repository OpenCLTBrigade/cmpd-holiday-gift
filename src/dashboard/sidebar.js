import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props) {
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

  render() {
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
              <a href="#">
                TODO
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                Test
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
