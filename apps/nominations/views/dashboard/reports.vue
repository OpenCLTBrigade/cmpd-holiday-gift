<template>
  <dashboard-box>
    <span slot="header">
      Reports
    </span>
    <span slot="body">
      <ul>
        <li> <a href="./api/export_data_excel">Export data into Excel</a> </li>
        <li> <a href="./api/bike_report">Bike report</a> </li>
        <li> <a href="./api/division_report">Division report</a> </li>
        <li> <a href="./api/link_report">The Link report</a> </li>
      </ul>
    </span>
  </dashboard-box>
</template>

<script>
  module.exports = {components: {'dashboard-box': require('../components/dashboardBox.vue')}};
</script>

<style lang="less">
</style>
