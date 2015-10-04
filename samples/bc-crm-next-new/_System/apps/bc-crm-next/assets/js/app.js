window.MyApp = (function($) {
    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridCustomers");
            this._quickSearch = document.getElementById("tfQuickSearch");
            this._orderByDd = document.getElementById("ddOrderBy");
            this._limitDd = document.getElementById("ddItemsPerPage");
            this._filterValue = "";
            this._orderBy = "0";

            BCAPI.Security.configure({
                "siteUrl": "https://devs-next.worldsecuresystems.com",
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84b01PTjN4MVpkSnpIM1k3U0Y2U1ZRY2pXdUE0S0d6dnB5UElXbW4rUEFsL0JONUZsQUMyNEY5aWdyQ0M2TnRHOHJoS0xLMDN6enpTRFJLSk5WWk1FR2R1OGQrUGhIUU45VEhxRjU5S0t2aU1Ib3hZQmRuMjk0UTQxcjFTdEVpM0VsbllIYUJyMThacm5pWjN6aWNJRU1KWHRoYi9wOTBuZ3RjWmRyalgwR1pVbGJOZlhyc1hxM3Q1SEVzTGFSSHFXUGZ1YjBVbW5IdTNCUURXNnpDczNhbHgrdlZZRXgrMVRYZU1WdWJBNno5c05nNnlwbDljc2dJbFdLS1Bsdm5nZENmUTJKbEo4elFqUkpIWVJkVHFKaFNPck9oOXlyWFE5d1hxRUw4VGRQQnRiRHM0NmRsaTVHa2ZIcExWU1VZcDhTWE41TFZNQ1haOWl4T2JtcEVtaytJPQ=="
            });

            this._dataGrid.configure();
        },
        onChangeOrderBy: function(selectedItem) {
            this._orderBy = selectedItem.value;

            this.onSearch(this._filterValue);
        },
        onChangeLimit: function(selectedLimit) {
            this._limit = parseInt(selectedLimit.value);

            this.onSearch(this._filterValue);
        },
        onChangeSearch: function(newFilterData) {
            if (newFilterData && newFilterData.value == this._filterValue) {
                return;
            }

            this._filterValue = newFilterData.value;

            if (this._filterValue == "") {
                this.onSearch(this._filterValue);
            }
        },
        onSearch: function(filterData) {
            this._limit = this._limit || this._limitDd.getValue().value;
            this._orderBy = this._orderBy || this._orderByDd.getValue().value;

            this._dataGrid.searchFullText(filterData.value, this._limit, this._orderBy);
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

            ordersGrid.dataSource.configure({
                "where": {"entityId": selectedCustomer.id}
            });

            ordersGrid.configure();
            ordersGrid.display(visible);
        },
        printInvoice: function(srcElement) {
            var order = srcElement.data,
                bcConfig = BCAPI.Security.getBcConfig(),
                invoiceUrl = [bcConfig.siteUrl, "/webresources/api/v3/sites/current/orders/", order.id, "?",
                                "format=application/vnd.bc.ecommerce.invoice-pdf"];

            invoiceUrl.push("&access_token=" + encodeURIComponent(bcConfig.accessToken));

            window.open(invoiceUrl.join(""));
        }
    };

    return app;
})($);

document.addEventListener("WebComponentsReady", function() {
    MyApp.init();
});
