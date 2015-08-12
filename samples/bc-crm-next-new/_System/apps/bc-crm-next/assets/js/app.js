window.MyApp = (function($) {
    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridCustomers");
            this._quickSearch = document.getElementById("tfQuickSearch");
            this._orderByDd = document.getElementById("ddOrderBy");
            this._limitDd = document.getElementById("ddItemsPerPage");
            this._filterValue = "";
            this._orderBy = "0";

            this._configureComponents();
        },
        _configureComponents: function() {
            this._bcConfig = {
                "siteUrl": "https://devs-next.worldsecuresystems.com",
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdERTU5WW9VdmlPeUl2WnVlZ0cvUFhhS0x4V0hNQk0vbk5lSU42R3VJeUVucUNaOHpnNW1CUGtmNnlTR3ZQOEdzK3BPM3hMSEU1cHhLUGYwYTlOU2J5ZmJSUVA0eUMwbVVTY0s3SjVMTDJTRUFqTW9sbUV3UnI0eTlBRUpWaVQrZHMvb0J1SitENVBGVysxVVo4Y3lHZ2Irc1lHM0I2MTEycDRpWGVlczlqOEpiZGlYdkFXU2VQV3R3VDFCR1l1N0hPQzZFZXNFYzB4VnQrSkhOK04xT1VoMWc3Ty93ajd3WklCcGVjWkhqOWY2NUF0dlNMSUdLSFpZUFN3QWxJc0dZb0RYZWkxL2NLL0JhOUpUS3lSZ1ZWZ1NJckdwVXc4N3lLdnk2VFBKRmNkWG4wZVJBS3B6dzZJT2k5QXRBQ29DemxEenJEaDZKeU54OEduT2RNa3hBaXJmZ1lHVmZQNDVIdTRzOG9LQ0tncy8="
            };

            this._dataGrid.configure({
                "bcConfig": this._bcConfig
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

    return app;
})($);

document.addEventListener("WebComponentsReady", function() {
    MyApp.init();
});
