<template>
  <div>
    <main-layout :user="user" current_section="dashbaord" no_boxes="true" title="dashboard">
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
          'quick-overview': require('./quickOverview.vue'),
          'packing-slips': require('./packingSlips.vue'),
          'reports': require('./reports.vue')
      }
  };
</script>

<style>
</style>
