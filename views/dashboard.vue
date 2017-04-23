<template>
  <main-layout>
    <p>Hello {{name}}!</p>
    <a href="/logout">Log Out</a>
  </main-layout>
</template>

<script>
  export default {
      data: () => ({name: null}),
      components: {
          'main-layout': require('./layouts/main.vue')
      }
  }
</script>

<style></style>
