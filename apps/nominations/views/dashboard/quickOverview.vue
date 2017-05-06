<template>
  <dashboard-box>
    <div slot="header">
      Quick Overview
    </div>

    <div slot="body">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>
              Accounts pending approval
            </td>
            <td>
              <!-- {{ $accounts_pending_approval }} -->
            </td>
            <td>
              <button class="btn btn-sm btn-default" onclick="window.location='/admin/user/pending'">
                Manage
              </button>
            </td>
          </tr>
          <tr>
              <td>
                  Nominations Pending Review
              </td>
              <td>
                  <!-- {{ $nominations_pending_review }} -->
              </td>
              <td>
                  <button class="btn btn-sm btn-default" onclick="window.location='/admin/household'">
                      Manage
                  </button>
              </td>
          </tr>
          <tr>
            <td>
              Nominations approved / reviewed
            </td>
            <td colspan="2">
              <!-- {{ $nominations_approved }} / {{ $nominations_reviewed }} -->
            </td>
          </tr>
          <tr>
            <td>
              Children (approved / reviewed / pending)
            </td>
            <td colspan="2">
              <!-- {{ $children_approved }} / {{ $children_reviewed }} / {{ $children_pending }} -->
            </td>
          </tr>
        <!-- @foreach ($orgs as $org) -->
          <tr>
            <td>
              Nominations from -- Organization name --
            </td>
            <td colspan="2">
              <!-- {{ $org->approved }} / {{ $org->reviewed }} / {{ $org->pending }} -->
            </td>
          </tr>
          <!-- @endforeach -->
          <tr>
            <td>
              Incomplete drafts
            </td>
            <td colspan="2">
              <!-- {{$drafts}} -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </dashboard-box>
</template>

<script>
  module.exports = {};
</script>
