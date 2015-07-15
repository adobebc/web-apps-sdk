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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84cGZTcmFBMnllS2ZMMFlod2tEaWxacEpWVklyOHpGVlBYWnZJMThiUE9hNUFnbFZqajJ3RkFXOENxUDZWNmdPbEhrbGthWlUwVlhmOXNSclJKQlZvejlXOTg5WDVBMUxkb1R4aHQwVTFVVmx0bGVLcnJPSzQ5SkZxZUhOUDE3QXBXMm4rd1daTGExUjlsK0RJR24zTEJsR0pwVFdyM1dGbmxkeVc3bGprcmVaMVVkTmhtR2xyaE1CVVJ1U0pOaGdBUEI1SE9jMkREQlRqOEN4VE83S1krS2w2SHZXeTNOUWx0ellyMEhXNUE0bTZTejEyczBCNm53MnRDYVRLdlJpaEY4bWFQb21QRm4zTnpTVXRFY0Rkd0JGV2s5OWwrRVNjamxFMWxyY0xNcWc="
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
            this._limit = this._limit || this._limitDd.getValue().value;
            this._orderBy = this._orderBy || this._orderByDd.getValue().value;

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
            var order = srcElement.data,
                invoiceUrl = [this._bcConfig.siteUrl, "/webresources/api/v3/sites/current/orders/", order.id, "?",
                                "format=application/vnd.bc.ecommerce.invoice-pdf"];

            invoiceUrl.push("&access_token=" + encodeURIComponent(this._bcConfig.accessToken));

            window.open(invoiceUrl.join(""));
        }
    };

    app.init();

    return app;
})($);