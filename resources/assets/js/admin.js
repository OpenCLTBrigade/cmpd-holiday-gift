$(function () {
    $('input[type=date]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true
    });

    $('#color').colorpicker().on('changeColor.colorpicker', function (event) {
        $(this).css('background-color', event.color.toHex());
    });

    if (!$('input[type=date]').val()) {
        $('input[type=date]').datepicker("setDate", new Date());
    }
});

$(document).ready(function () {
    $("table.datatable").each(function (i, element) {
        new DataTable(element);
    });
});


/**
 * DataTable class allows for creating 
 * complex data tables through the DOM
 * @param {String|DOM} table CSS identifier (#/.) or DOM/jQuery Object
 * @param {Object} details Details to load DataTables width (overrides any DOM-based ones)
 */
var DataTable = function (table, details) {
    var object = this;
    this.checkboxes = [];
    this.dt = null;
    this.inputs = [];
    this.last = null;
    this.lastSearch = null;
    this.table = null;
    this.searchTimeout = null;
    this.submitFunction = null;
    this.useDefaults = false;

    /**
     * Allow attaching events to the data table
     * by passing them right on through
     * @returns {Boolean} True if event setup
     */
    this.on = function () {
        if (!this.table) {
            return false;
        }

        // Pass the arguments straight to datatables
        try {
            this.table.on.apply(this.table, arguments);
        } catch (error) {
            return false;
        }

        return true;
    };

    /**
     * Removes an event from the data table
     * @returns {Boolean} True if event removed
     */
    this.off = function () {
        if (!this.table) {
            return false;
        }

        // Pass the arguments straight to datatables
        try {
            this.table.on.apply(this.table, arguments);
        } catch (error) {
            return false;
        }

        return true;
    };

    /**
     * Parses a datatable and gets all of the various settings/functions
     * @param {jQuery} table jQuery DOM element
     * @returns {Object} Returns object with all settings
     */
    this.parseStructure = function (table) {
        if (!table) {
            return {};
        }

        var result = {
            orderClasses: false,
            fixedHeader: true,
            responsive: false,
            dom: "tip",
            stateSave: true,
            stateSaveCallback: function (settings, data) {
                localStorage.setItem(object.id + '-DataTables_' + settings.sInstance, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                if (!object.useDefaults) {
                    return {};
                }

                return JSON.parse(localStorage.getItem(object.id + '-DataTables_' + settings.sInstance));
            },
            pageLength: (object.useDefaults) ? (Cookies.get(object.id + "-limit") || 25) : 25
        };

        // Get datatype
        var dtAjax = eval(table.data("server") || "");
        var dtData = eval(table.data("source") || "");
        if (typeof dtAjax === "boolean" || typeof dtAjax === "function") {
            result.processing = true;
            result.serverSide = true;
            result.deferRender = true;
            result.ajax = {
                url: window.location.href +"/search",
                type: "POST",
                data: function (data) {
                    data["_token"] = $('meta[name="_token"]').attr ("content");
                    data.ajax = +new Date();

                    // Loop through each checkbox and get the selected one's value
                    for (var c in object.checkboxes) {
                        var name = object.checkboxes[c];
                        data[name] = $("input[name='" + name + "']:checked").val();
                    }

                    // Loop through all inputs and get their values
                    for (var i in object.inputs) {
                        var name = object.inputs[i];
                        data[name] = $("[name='" + name + "']").val();
                    }

                    // Allow external method to modify the data
                    if (typeof dtAjax === "function") {
                        dtAjax(data);
                    }

                    object.last = data;
                }
            };
        } else if (["function", "object"].indexOf(typeof dtData) >= 0) {
            result.data = (typeof dtData === "function") ? dtData() : dtData;
        }

        // Handle created row
        var dtRow = eval(table.data("row") || "");
        result.createdRow = function (row, data, index) {
            if (typeof data !== "object") {
                return;
            }

            row = $(row);
            if (data.active === "false" || data.active === false) {
                row.addClass("inactive");
            }

            if (typeof dtRow === "function") {
                dtRow(row, data, index);
            }
        };

        // Get column definitions
        var order = [];
        var columns = [];
        var columnDefs = [];
        
        // Add a blank column for the + to go into
        table.find ("thead > tr").prepend ($("<th>").addClass ("expander").attr ("data-class-name", "expander"));
		
        // Loop through all headers and set them up
        table.find("th").each(function (i, element) {
            element = $(element);

            var className = element.data("class-name") || "";
            element.addClass(className);

            var name = element.data("name") || "";
            var data = element.data("data") || name || "";
            var column = {
                data: data,
                name: name,
                className: name + " " + className,
                sortable: element.hasClass("sortable")
            };

            // Get the sort order (sort priority is done left-to-right)
            var sort = element.data("sort");
            if (sort) {
                order.push([i, sort.toLowerCase()]);
            }

            // Get render/column def object/function, providing defaults if nothing is provided
            var render = eval(element.data("render") || "");
            if (typeof render !== "function") {
                render = null;
            }

            var columnDef = eval(element.data("column-def") || "");
            if (typeof columnDef !== "object") {
                columnDef = {
                    render: render || function (data, type, row) {
                        if (element.hasClass ("expander")) {
                            return "";
                        }
                        
                        return data || "--";
                    },
                    targets: i
                };
            } else {
                columnDef.render = render || columnDef.render;
            }

            columns.push(column);
            columnDefs.push(columnDef);
        });

        result.order = (order.length) ? order : [1, 'asc']; 
        result.columns = columns;
        result.columnDefs = columnDefs;
        return result;
    };

    /**
     * Reloads the table from the data source
     * @param {String|Boolean} search String to search for, if true provided, forces search
     */
    this.refresh = function (search) {
        var force = search === true;
        if (force) {
            search = null;
        }

        search = search || ((this.search && this.search.val) ? this.search.val() : this.lastSearch) || "";
        if (!force && search === this.lastSearch) {
            return;
        }

        this.dt.page.len(Cookies.get(this.id + "-limit") || 25);
        this.dt.search(search).draw();
        this.lastSearch = search;
        Cookies.set(this.id + "-search", search);
        Cookies.set(this.id + "-table", this.table.attr("class"));
    };

    /**
     * Setup the events for the table
     */
    this.setupEvents = function () {
        this.table.bind ("refresh", function () { object.refresh (); });

        // Handle drop-down menu clicks
        this.table.on("click", ".action a, .action[data-action]", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var element = $(this);
            var action = element.attr("data-action");
            var row = object.dt.row(element.parents("tr")[0]).data();
            var data = element.attr("href");
            object.table.trigger("action", [data, action, element, row]);
        });

        // Handle clicking on the "expand" icon
        this.table.on("click", "td:first-child", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        });

        // Handle column clicks (that do not have a "link" class)
        this.table.on("click", "td:not(.link)", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var element = $(this);
            var row = object.dt.row(element.parents("tr")[0]).data();
            object.table.trigger("row", [element, row]);
        });

        // Handle clicking actual links
        this.table.on("click", "td:not(.link) a", function (e) {
            e.stopImmediatePropagation();

            var element = $(this);
            var row = object.dt.row(element.parents("tr")[0]).data();
            var data = element.attr("href");
            object.table.trigger("link", [data, element, row]);
        });

        // Handle column clicks that are a "link" by finding their child link and "clicking" it
        this.table.on("click", "td.link", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var element = $(this);
            var link = $(element.find("a")[0]);
            var row = object.dt.row(element.parents("tr")[0]).data();
            var data = element.attr("href");
            object.table.trigger("link", [data, link, row]);
        });

        this.dt.on("processing.dt", function (e, settings, is_processing) {
            if (!object.search) {
                return;
            }

            object.search.parent().toggleClass("has-feedback", is_processing);
            object.search.siblings("div.form-control-feedback").css("top", "0px !IMPORTANT");
        });

        this.table.trigger("ready", [this]);
    };

    /**
     * Sets up an associated form with standard events
     * This will pre-configure the search and limits
     * Note: This looks for all elements with "for=[form id]"
     */
    this.setupForm = function () {
        $("[for='" + this.id + "']").each(function (i, element) {
            element = $(element);
            if (element.hasClass("search")) {
                // If useDefaults is not set, remove any previous-save values
                if (!object.useDefaults) {
                    Cookies.remove(object.id + "-search");
                }

                var defaultValue = Cookies.get(object.id + "-search") || "";
                element.val(defaultValue);

                object.search = element;
                object.form = $(element.parents("form")[0]);

                // Handle search field "change" events
                element.on("change", function (e) {
                    object.refresh();
                });

                // Handle the "Enter" key being pressed
                element.on("keydown", function (e) {
                    if (e.keyCode !== 13) {
                        return;
                    }

                    e.preventDefault();
                    clearTimeout(object.searchTimeout);

                    var rows = object.dt.rows(null).data();
                    object.table.trigger("submit", [this.value, rows]);
                });

                // Handle typing into the search field
                element.on("keyup", function (e) {

                    // Ignore all special characters
                    if ([0, 9, 13, 16, 17, 18, 19, 20, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 93, 144, 145].indexOf(e.which) >= 0) {
                        return;
                    }

                    clearTimeout(object.searchTimeout);
                    object.searchTimeout = setTimeout(function () {
                        object.refresh();
                    }, 333);
                });

                return;
            }

            // Handle button groups (a group of checkboxes/radios)
            if (element.hasClass("btn-group")) {
                var name = element.find("input").eq(0).attr("name");

                element.find("input").on("change", function (e) {
                    var value = $("input[name='" + name + "']:checked").val();
                    Cookies.set(object.id + "-" + name, value);
                    object.table.trigger("btn-group-change", [name, value]);
                    object.refresh(true);
                });

                // If useDefaults is not set, remove any previous-save values
                if (!object.useDefaults) {
                    Cookies.remove(object.id + "-" + name);
                }

                // Set the default if the cookie has a value
                var defaultValue = Cookies.get(object.id + "-" + name);
                if (defaultValue) {
                    $("input[name='" + name + "']").prop("checked", false).parent().removeClass("active");
                    $("input[name='" + name + "'][value='" + defaultValue + "']").prop("checked", true).parent().addClass("active");
                }

                // Push the name to the values list so we send to the server automatically
                object.checkboxes.push(name);
                return;
            }

            // Handle individual checkboxes/radios
            if (element.is(":checkbox") || element.is(":radio")) {
                var name = element.attr("name");
                element.on("change", function (e) {
                    var value = $("input[name='" + name + "']").is(":checked");
                    Cookies.set(object.id + "-" + name, value);
                    object.table.trigger("input-change", [name, value]);
                    object.refresh(true);
                });

                // If useDefaults is not set, remove any previous-save values
                if (!object.useDefaults) {
                    Cookies.remove(object.id + "-" + name);
                }

                // Set the default if the cookie has a value
                var defaultValue = Cookies.get(object.id + "-" + name);
                if (defaultValue) {
                    $("input[name='" + name + "']").prop("checked", defaultValue === "true");
                }

                object.checkboxes.push(name);
                return;
            }

            // Handle text boxes, textareas and selects
            if (element.is(":text") || element.is("textarea") || element.is("select")) {
                var name = element.attr("name");
                element.on("change", function (e) {
                    var value = $("[name='" + name + "']").val();
                    Cookies.set(object.id + "-" + name, value);
                    object.table.trigger("input-change", [name, value]);
                    object.refresh(true);
                });

                // If useDefaults is not set, remove any previous-save values
                if (!object.useDefaults) {
                    Cookies.remove(object.id + "-" + name);
                }

                // Set the default if the cookie has a value
                var defaultValue = Cookies.get(object.id + "-" + name);
                if (defaultValue) {
                    $("input[name='" + name + "']").val(defaultValue);
                }

                object.inputs.push(name);
                return;
            }

            if (element.hasClass("export")) {
                element.on("click", function (e) {
                    e.preventDefault();

                    var search = object.last;
                    search.export = "csv";
                    window.location = window.location.pathname + "?" + $.param(search);
                });

                return;
            }
        });
    };

    /**
     * Initializes the given table
     * @param {String|DOM} table CSS Selector or DOM element
     * @param {Object} details Additional details for the table
     */
    this.init = function (table, details) {
        table = $(table);
        if (!table.length) {
            return;
        }

        // Don't initialize this table again
        if (this.table === table || $.fn.DataTable.isDataTable(table)) {
            return;
        }

        // Setup the default values
        this.id = table.attr("id");
        this.table = table;
        this.table.DT = this;

        // Only use defaults if the "search" cookie is enabled
        // This cookie gets unset anytime someone uses the navigation to leave the page
        this.useDefaults = Cookies.get("searching") === "true";
        Cookies.set("searching", "true");

        // Setup the form and set all of the defaults from cookies
        this.setupForm();

        details = details || {};
        if (!details.search && this.search && this.search.val) {
            details.search = {
                search: this.search.val()
            };
        }

        // Create our DataTale and setup the events
        this.dt = table.DataTable(Object.assign(this.parseStructure(table), details));
        this.setupEvents();

        // Restore classes
        var classes = Cookies.get(this.id + "-table")
        if (classes != null && this.useDefaults) {
            this.table.attr("class", classes);
        }
    };

    // Setup the table with what we're given
    this.init(table, details);
};
