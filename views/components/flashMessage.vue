<!-- TODO: replaces laracasts/flash -->

<template>
  <div class="alert alert-warning">
    <button type="button" class="close" v-on:click="close">&times;</button>
    <slot></slot>
  </div>
</template>

<script>
  module.exports = {
      methods: {
          close: ev => $(event.currentTarget).parent().hide()
      }
  };
</script>

<style></style>
