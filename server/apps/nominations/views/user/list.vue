<template>
  <main-layout :user="user" current_selection="users" title="Users">
    <h2>Manage Users</h2>

      <vuetable
          api-url = "/api/users"
          :fields = "columns"
      />
  </main-layout>

</template>

<script>
const VueTable = require('vuetable-2/src/components/VueTable.vue');
module.exports = {
  props: ['user', 'users'],
  components: { vuetable: VueTable },
  data: () => ({
    columns: [
      {
        name: 'name_first',
        title: 'First Name'
      },
      {
        name: 'name_last',
        title: 'Last Name'
      },
      {
        name: 'email',
        title: 'Email Address'
      }
    ]
  }),
  methods: {}
};
</script>

<style lang="less">
  table {
    color: #000
  }
</style>
