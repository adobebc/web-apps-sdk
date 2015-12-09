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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84ZzQyVE8yNGZkdnUvWldmcTR0dG9ERTdZaEJvb2UyK0FpbzgvTFMxV0oycXgyZ1NhMXhaa3JRTUZxOUR6dXJsNnZXMnlYdmhnTVBWUUlHR2hUZW03WmJ4bG0zd0hCZFg1OGtPYnNNVGZjZlBacnlHT1dLQ2VkK3M1Z1VUaHpTUnVYWHdhQmVOTGxFVHlZVS9JMnJqa0F1VnJXL2E0bkdUU3AxQldJNUhXQlhxU1hDSUFEMExGN0dvMG1Id2QvNkdQQ1FSbnNHQ0hwYWplYm5nUFBaRXRULzZmK0NDTU1ja0RRd0xLM292TjZ3WVZxVC8zL0IzOUg3QkNZZDlVN05GR3pRSi9BcCszOEVJNkpZaExQRCtrWmtHMnJiV1gyNUdPZ2JzM3Y1TnBuNTlsem1jODhHdEhnTWI2UlNHZ3ZxQzdNWCtMRzRTMlV2RjhDRjg5ZEZrRldJPQ=="
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
