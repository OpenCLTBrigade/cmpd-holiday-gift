<!-- col-md-6 boxes for the dashboard -->

<template>
  <div class="col-xs-12 col-md-6">
    <div class="box">
      <div class="box-header with-border">
        <h2 class="panel-title">
          <slot name="header"></slot>
        </h2>
      </div>
      <div class="box-body">
        <slot name="body"></slot>
      </div>
    </div>

  </div>
</template>

<script>
  module.exports = {};
</script>

<style lang="less">
</style>
