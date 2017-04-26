<template>
  <div>
    <main-layout :user="user" current_section="dashbaord" no_boxes="true">
      <dashboard-box>
        <span slot="header">
          Dashboard
        </span>
        <span slot="body">
          <p>
            Hello, {{user.name_first}}!
          </p>
        </span>
      </dashboard-box>

      <quick-overview></quick-overview>
      <packing-slips></packing-slips>
      <reports></reports>

    </main-layout>
  </div>
</template>

<script>
  export default {
      props: ['user'],
      components: {
        'main-layout': require('../layouts/main.vue'),
        'quick-overview': require('./quickOverview.vue'),
        'packing-slips': require('./packingSlips.vue'),
        'dashboard-box': require('../components/dashboardBox.vue'),
        'reports': require('./reports.vue')
      }
  };
</script>

<style>
</style>
