<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li v-for="item in menu" :class="`${item.name == current_section ? 'active' : ''} ${item.children ? 'treeview' : ''}`">
          <a :href="item.url || '#'">
            {{item.title}}
            <i v-if="item.children" class="fa fa-angle-left pull-right"></i>
          </a>
          <ul v-if="item.children" class="treeview-menu">
            <li v-for="child in item.children" :class="child.name == current_section ? 'active' : ''">
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
              {name: 'dashboard', url: '/', title: 'dashboard1'},
              {name: 'dashboard2', title: 'dashboard2',
               children: [{name: 'dashboard3', url: '/', title: 'dashboard3'},
                          {name: 'dashboard4', url: '/', title: 'dashboard4'}]},
              {name: 'dashboard5', url: '/', title: 'dashboard5'}
          ]
      }),
      props: {
          current_section: {type: String, required: true}
      }
  }
</script>
