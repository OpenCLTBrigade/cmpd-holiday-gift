@extends('layouts.admin')

@section('content')

    <form class="form-horizontal form-condensed datatable-form" autocomplete="false">
        <div class="row">
            <div class="form-group">
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <input type="search" class="form-control input-sm search" placeholder="Filter results" for="Households" autofocus />
                    <div class="form-control-feedback"><span class="fa fa-spinner fa-spin"></span></div>
                </div>
            </div>
        </div>
    </form>

    <table id="Households" class="table table-hover table-striped datatable" data-server="true">
    {{-- When changing the columns, make sure the column indices for sort order in HouseholdController::search still match --}}
        <thead>
            <th data-name="head_of_household_name" class="sortable">Head of Household</th>
            <th data-name="child_count">Children</th>
            @if (Auth::user()->hasRole("admin"))
            <th data-name="nominated_by" class="sortable">Nominated by</th>
            @endif
            <th data-name="uploaded_form">Uploaded Form</th>
            <th data-render="renderActions">Tools</th>
            <th data-name="review_options">Review</th>
        </thead>
    </table>
    <review-modal></review-modal>

    <script type="text/x-template" id="review-modal">
        <modal :show.sync="visible" effect="fade" width="75%" height="75%">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Submit Household Review</h4>
            </div>
            <div slot="modal-body" class="modal-body">
                <div>
                    <div class="form-group">
                        <label>Approve?</label>
                        <select class="form-control" v-model="approved">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div class="form-group" v-show="approved == 0">
                        <label>Reason</label>
                        <select class="form-control" v-model="reason">
                            <option value="duplicate">Duplicate</option>
                            <option value="invalid">Invalid</option>
                            <option value="third-party">Referred to third party</option>
                            <option value="other">Other (explained in email)</option>
                        </select>
                    </div>
                    <div class="form-group" v-show="approved == 0">
                        <label for="inputLastName">Message to send in email</label>
                        <span v-if="!message">
                            <br/>The nominator will not be notified that their nomination was declined if you do not
                            enter a message.
                        </span>
                        <textarea class="form-control" v-model="message"></textarea>
                    </div>
                </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <span v-if="!isReviewFormValid()">Please complete the form before submitting</span>
                <i v-if="loading" class="fa fa-2x fa-spinner fa-pulse"></i>
                <button class="btn btn-lg btn-default" :disabled="loading" @click="close">Cancel</button>
                <button class="btn btn-lg btn-success" :disabled="loading || !isReviewFormValid()" @click="submitReview">Submit Review</button>
            </div>
        </modal>
    </script>

    <script type="text/javascript">
        let table = $("#Households");

        function renderActions (data, type, row) {
            let output = '<ul class="list-inline no-margin-bottom">';
            output += '<li><button class="btn btn-xs bg-navy action" data-action="show"><i class="fa fa-search"></i> Show</button></li>';
            output += '<li><button class="btn btn-xs bg-olive action" data-action="edit"><i class="fa fa-pencil-square-o"></i> Edit</button></li>';
            output += '</ul>';

            return output;
        }

        // Handle button clicks
        table.on ("action", function (event, data, action, element, row) {
            switch (action) {
                case "show":
                    window.location.href += "/" + row.id;
                    break;
                case "edit":
                    window.location.href += "/" + row.id +"/edit";
                    break;
            }
        });

        Vue.component('review-modal', {
            template: "#review-modal",
            components: {
                modal: VueStrap.modal
            },
            data: function () {
                return {
                    household_id: null,
                    visible: false,
                    loading: false,
                    error: {
                        show: false,
                        message: ""
                    },
                    approved: 1,
                    reason: null,
                    message: ""
                }
            },
            methods: {
                isReviewFormValid: function ()
                {
                    var approvedOk = (this.approved == 1);
                    var declinedOk = (this.approved != 1 && this.reason != null);

                    return (approvedOk || declinedOk);
                },
                close: function ()
                {
                    this.visible = false;
                    this.loading = false;
                },
                submitReview: function ()
                {
                    var self = this;
                    self.loading = true;

                    $.ajax ({
                        url: "/admin/household/" + this.household_id + "/review",
                        type: "POST",
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        data: $.param({
                            ajax: +new Date (),
                            approved: this.approved,
                            reason: this.reason,
                            message: this.message
                        }),
                        success: function (results) {
                            self.loading = false;
                            console.log(results);
                            if (!results.ok)
                            {
                                return;
                            }
                            self.refreshDataTable();
                            self.close();
                        },
                        error: function () {
                            self.loading = false;
                        }
                    });
                },
                refreshDataTable: function ()
                {
                    // TODO: This is an awful hackaround.
                    var ogVal= $("input[type='search']").val();
                    $("input[type='search']").val('randomString');
                    $("input[type='search']").trigger('keyup');
                    setTimeout(function()
                    {
                        $("input[type='search']").val(ogVal);
                        $("input[type='search']").trigger('keyup');
                    }, 750);
                }
            },
            events: {
                show_review_modal: function (id)
                {
                    this.reason = null;
                    this.message = "";
                    this.approved = 1;
                    this.visible = true;
                    this.household_id = id;
                }
            }
        });


        var vm = new Vue({
            el: "body",
            components: {
                alert: VueStrap.alert,
                modal: VueStrap.modal
            },
            data: {

            },
            methods: {
                show_review_modal: function (id)
                {
                    this.$broadcast('show_review_modal', id);
                }
            }
        });
    </script>
@endsection
