<template>
  <main-layout :user="user" current_section="dashbaord" title="Dashboard">
    <p>Hello, {{user.name_first}}!</p>
  </main-layout>
</template>

<script>
  export default {
      props: ['user'],
      components: {'main-layout': require('./layouts/main.vue')}
  };
</script>

<style>
</style>
