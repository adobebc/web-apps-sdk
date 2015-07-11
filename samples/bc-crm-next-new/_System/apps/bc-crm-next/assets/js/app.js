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
            this._dataGrid.configure({
                bcConfig: {
                    "siteUrl": "https://devs-next.worldsecuresystems.com",
                    "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84cENlaEJaNUJQVzZjazdTZWZUN3BUdVYrMWtRdW03QW96cXhqMXhpaWh6bTlwbW1FczI5NkNZVmttVGE3aUhUaGNJRnJCMmk3NUpMYjA2YTl2ZkQvcmRReVhMV2ViVmY4azdGVzhQbG1ENnZZYlhDNUhDR3AzZmlmbG12dWxhQTJLNjBRbVBhVkJRZ2FXVUJ2UW1qNjNKd2dvYlcrMUxudzFwTjFnV1VCMTNiQi9QMXkwSkpnRkNXcXV3ZWxwdzgvSEFWbnNLelJwQWk3MWFuZnF4K2ZkbXNJQmRVdk1PVHZDWXBmYW9RT3o1d21zWFhLdFVLR2hoUUFzVFBSOUMxWS9lTXhqWHQ2MHVlcjB2Ti9kQ3E3RHlqcE8zZjBTUmxPclp0S0Zlamd2THA= "
                }
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
            this._filterValue = newFilterValue;

            if (this._filterValue == "") {
                this.onSearch(this._filterValue);
            }
        },
        onSearch: function(filterValue) {
            this._dataGrid.searchFullText(filterValue, this._limit, this._orderBy);
        },
        showCustomerDetails: function(srcElement, customer) {
            console.log("Show selected customer details ...");
            console.log(customer.firstName);
        },
        showCustomerOrders: function(srcElement, customer) {
            console.log("Show orders belonging to selected customer ...");
            console.log(customer.firstName);
        }
    };

    app.init();

    return app;
})($);