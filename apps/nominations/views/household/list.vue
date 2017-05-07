<template>
  <main-layout :user="user" current_section="households" title="Households">
    <h2>All households</h2>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th v-for="column in gridColumns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="household in households">
          <td>
            <a :href="`/household/${household.id}/edit`">
            {{household.name_first}} {{household.name_last}}
            </a>
          </td>
          <td>0</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>Buttons</td>
          <td>Review</td>
        </tr>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
    module.exports = {
        data: () => ({
            gridColumns: [
                'Head of Household',
                'Children',
                'Nominated By',
                'Uploaded From',
                'Tools',
                'Review'
            ]
        }),
        props: ['user', 'households']
    };
</script>
