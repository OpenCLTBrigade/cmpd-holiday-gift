import React from 'react'

export default class Sidebar extends React.Component {
  constructor (props) {
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
                    title: 'List Nominations',
                }
            ]
        }
    ];
  }

  render () {
    // TODO: Finish this
    // const navItems = this.menu.map(item => )
    return (
      <aside class="main-sidebar">
        <section class="sidebar">
          {/* <ul class="sidebar-menu">
            <li v-for="item in menu" :class="`${item.name == current_section ? 'active' : ''} ${item.children ? 'treeview' : ''}`">
              <a :href="item.url || '#'">
                <i v-if="item.icon" :class="item.icon"></i>
                {{item.title}}
                <i v-if="item.children" class="fa fa-angle-left pull-right"></i>
              </a>
              <ul v-if="item.children" class="treeview-menu">
                <li v-for="child in item.children" :class="child.name == current_section ? 'active' : ''">
                  <i :class="`${child.icon ? child.icon : 'fa fa-circle-o'}`"></i>
                  <a :href="child.url">{{child.title}}</a>
                </li>
              </ul>
            </li>
          </ul> */}
          <ul>
            <li>
              TODO
            </li>
          </ul>
        </section>
      </aside>
    )
  }
}
