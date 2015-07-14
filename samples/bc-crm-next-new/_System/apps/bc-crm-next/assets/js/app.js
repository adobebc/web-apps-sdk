window.MyApp = (function($) {
    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridCustomers");
            this._quickSearch = document.getElementById("tfQuickSearch");
            this._orderByDd = document.getElementById("ddOrderBy");
            // this._orderByDdDynamic = document.getElementById("ddOrderByDynamic");
            this._limitDd = document.getElementById("ddItemsPerPage");
            this._filterValue = "";
            this._orderBy = "0";

            this._configureComponents();
            this._wireEvents();
        },
        _configureComponents: function() {
            this._bcConfig = {
                "siteUrl": "https://devs-next.worldsecuresystems.com",
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84bnVVcFh6U2JBSEsxb0NZbDFXdFlacGJkVzlwZm9PQldVcGcrYU9zTDFzVFFTUHM2VWtnMHg5NklockVPbUtBMmUvSmlZVVBDQ0lPQXgrUFNReGtDZXN5eXBSR2ZBVW5KUWNuUVVGRmt2cFEyVkR4ejJpVEYxUFNlcWVZUU1tQVkyTnpVRjl2dnk5OHRZMzN0S3IxdG1kc0tBYmgwQzhXK0s0MVB4eExSN2JrZDlDOW0va2lPS1BqVE5qTEQrcDJyZVFPYjE2dG1WRERQbVlhL0hmK0FQUjA5SExVL0ZYUzEwcWtTNWFNK1VWck5MSVJCUWhTSW4wbFkyVkdNWmNRazc3S2ZQUXZRK2QwbkthWi80MURPaXhMYkJnaVBrdnh2V29iQnJuQ0tZc2M="
            };

            this._dataGrid.configure({
                "bcConfig": this._bcConfig
            });

            /*this._orderByDdDynamic.configure({
                items: [
                    {"value": "0", "text": "Order by"},
                    {"value": "id", "text": "Customer Id"},
                    {"value": "firstName", "text": "Order by"},
                    {"value": "middleName", "text": "Middle name"},
                    {"value": "lastName", "text": "Last name"},
                    {"value": "homePhone", "text": "Phone number"}
                ]
            });*/
        },
        _wireEvents: function() {
            var self = this;

            this._quickSearch.wireEvents({
                "textfield:change": function(evtData) {
                    self.onChangeSearch(evtData.value);
                },
                "textfield:search": function(evtData) {
                    self.onSearch(evtData.value);
                }
            });

            this._orderByDd.wireEvents({
                "dd:change": function(evtData) {
                    self.onChangeOrderBy(evtData);
                }
            });

            this._limitDd.wireEvents({
                "dd:change": function(evtData) {
                    self.onChangeLimit(evtData);
                }
            });
        },
        onChangeOrderBy: function(selectedItem) {
            this._orderBy = selectedItem.value;

            this.onSearch(this._filterValue);
        },
        onChangeLimit: function(selectedLimit) {
            this._limit = parseInt(selectedLimit.value);

            this.onSearch(this._filterValue);
        },
        onChangeSearch: function(newFilterValue) {
            if (newFilterValue == this._filterValue) {
                return;
            }

            this._filterValue = newFilterValue;

            if (this._filterValue == "") {
                this.onSearch(this._filterValue);
            }
        },
        onSearch: function(filterValue) {
            this._dataGrid.searchFullText(filterValue, this._limit, this._orderBy);
        },
        showCustomerDetails: function(srcElement) {
            var selectedCustomer = srcElement.data;

            console.log("Show information about customer ...");
            console.log(selectedCustomer);
        },
        showCustomerOrders: function(srcElement) {
            var selectedCustomer = srcElement.data,
                ordersGridSelector = "bc-datagrid[data-orders-sid='" + selectedCustomer.id + "']",
                ordersGrid = $(ordersGridSelector)[0],
                visible = !ordersGrid.visible;

            ordersGrid._dataSource.configure({
                "where": {"entityId": selectedCustomer.id}
            });
            ordersGrid.configure({
                "bcConfig": this._bcConfig
            });

            ordersGrid.display(visible);
        },
        printInvoice: function(srcElement) {
            console.log(srcElement);

            var order = srcElement.data;

            console.log(order);
        }
    };

    app.init();

    return app;
})($);