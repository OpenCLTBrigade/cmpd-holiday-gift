<template>
  <main-layout :user="user" current_section="dashbaord" title="Dashboard">
    <p>Hello, world!</p>
  </main-layout>
</template>

<script>
  export default {
      data: () => ({user: null}),
      components: {
          'main-layout': require('./layouts/main.vue')
      }
  }
</script>

<style></style>
