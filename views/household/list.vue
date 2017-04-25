<template>
  <main-layout :user="user" current_section="households" title="Households">
    <h2>All households</h2>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th v-for="key in columns">
    <ul>
      <li v-for="household in households">
        <a :href="`/household/${household.id}/edit`">
          {{household.name_first}} {{household.name_last}}
        </a>
      </li>
    </ul>
  </main-layout>
</template>

<script>
  module.exports = {
      props: ['user', 'households'],
      components: {'main-layout': require('../layouts/main.vue')}
  };
</script>
