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
                    "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84cmc5Nnk2d3ZkdjdTb3YzR0FzdDRZc1BNRC9XNmVXUi96akl0Y2VPSWE2aXA3Y0Z6eHpZWTJ5K3JhS1pSREFFNE5PMnBLRXgzYStlOUZ1WGlOWXk0NHRPOEtnV0k5b2pRbGJ3cng3Q2FEazJFejBoczBRQ3lpWGZrb0wveHV4RnZYK0RDV0R6K3pXd0dTRUFpWFZXTndvWWNBN2VGRmt6TEV0SlV2NWQzM1VIdiswaHdGWWFheTl3bnA5eVk4MjYyYm96UmRJbEU2Z0d0cExhN05taC9TeEhPYjJOVkhMQk4reDdVb2F6emZObk1CT3pOWlY0SmlFcndFWXZ0a2k1ZUttOFFSNzh1ME9QZjJTdlMzVjh6di9NbTRuekFtdkhKVUVtbE4zN3Jmbk8="
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