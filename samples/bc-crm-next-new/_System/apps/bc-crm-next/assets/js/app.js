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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84bHVTcmNzYk1yZnZBbTk3MllWZzk4WHZtU2F1eUtURFpRUU5NbzEveFJDa1dtOXdPNVQ1c2JMK2d2TDRUMjJVc3owbVdWbUVuNmhoREpyUTJKaXFvL01ZZk1hdUd5dm1sNm5PSHpFTFVyaDVUelBkSU94OHhJVjJ4T1Q2M0FMaW5lYzAvK0FTYUFqUGVXNkFBblRMWjJHU2RGWGh6YUcya0pNb0E1MWk4NTdycEVyd2t3VEI2eldxTFU1cHpRb0RiWXpZUzhEZ2NIUGNBRGVpV0s3L08rbjdacEUyQm9qZHJ4YVFiVjgxWTlCbFZVUkVSUDNmOHhPSFZnTkZjSW11RXpCQTZub3FuZFVPM1NEVFJkS1QrRjl6dVZ2NTlkNVVneUc1M003cWJSQUdDcXp0a1g5Y2ZidSs0UFpaZE9MbHBtajYvaytDU01HYitQZmpJSnZ4aVlvPQ=="
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
