<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
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
      </ul>
    </section>
  </aside>
</template>

<script>
    module.exports = {
        data: () => ({
            menu: [
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
            ]
        }),
        props: {current_section: {type: String, required: true}}
    };
</script>

<style lang="less">
  .fa {
    color: #FFF;
    display: inline;
  }
  li {
    a {
      display: inline;
    }
  }
</style>
