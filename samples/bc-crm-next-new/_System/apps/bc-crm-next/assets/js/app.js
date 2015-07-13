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
                    "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84b21Wc0c0T3BoUWQ2ZEdvc09nOStWbGZmcC8rTGpSano1YjBESTdydzdDdzRkTWdwWEtYY0huWFNveExwQm1XK0JsbmUzL21tRWxBQm9FSVVWVGl1QURadEFiMnU1SXRzV3NsdHkxOU1RQnZHSmZiRWtPbHgya2VmbDZNSFc5ZFpFalc3QUdJUjlMRE82L050ZjNMTjU2d0xOK202MmU1MlpTSUJ6UnZPMjVrRGVxcXJyR2V1M2RtNmpnNU5CbTIwR1Vac0daa1o0dTVKb0xudlQybjVxbGFkZDhqTit2cmQ3S3dybXZYV1lmVEV6d3FUVHg3RHFtZUpEbTRkS2twSUg1WGxNM3JVVDdhb2tCTEprV2s5Vm1KVXRhUnZpNW5LcDlRMnFnbW9vZnQ="
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
            if (newFilterValue == this._filterValue) {
                return;
            }

            this._filterValue = newFilterValue;

            if (this._filterValue == "") {
                this.onSearch(this._filterValue);
            }
        },
        onSearch: function(filterValue) {
            console.log(filterValue);
            this._dataGrid.searchFullText(filterValue, this._limit, this._orderBy);
        },
        showCustomerDetails: function(srcElement) {
            var selectedCustomer = srcElement.data;

            console.log("Show information about customer ...");
            console.log(selectedCustomer);
        },
        showCustomerOrders: function(srcElement) {
            var selectedCustomer = srcElement.data;

            console.log("Show orders belonging to selected customer ...");
            console.log(selectedCustomer);
        }
    };

    app.init();

    return app;
})($);