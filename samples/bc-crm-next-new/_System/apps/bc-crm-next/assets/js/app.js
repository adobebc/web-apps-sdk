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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84c2gzUkxMNG8ycExnQkt6ZVlVMzlFV0crWHJ5RVBqNU4rN0tHTHpCTE1PZTlVaVloMmg4R0FzcE9rNzVrWVNySlJlTmZ6aTRJYnRwcFNoMTVJZEJhUGxuTDBOZEJBZ2NReExBdXVmbFVVamE5THVMbUkwUWt1SWRLekZzb09KWUxaelc1T1dKLzBHQjRtQUNNdTVIaG5rbjNSaGE1S2tuZEVGYnM4blJVUWMrMTBDNERBVDB0dWJDSmVPWWV6M3pLMEErUHlqN3RpUWdFTDJ3RHNYRk5YUlBJdlZXMVpaemdVRW14VWFzN1RENStuY3JZMTIwS0dURkFHMVVyNEtSN0Nhd1lwZ3RSZzNtbTBqdUN1Q1lOb09IT3ZQSW1IdzJyTWxMdWdVcDQ3R0tUQjdRVk40YW44ZnVMMEg3ZmNwSjRzdk1QSEpnZlhqVHI4QjVOQ1ZPb3ZNPQ=="
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
