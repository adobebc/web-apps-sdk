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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdIeUdXdTJENEcveWE3RUdXdTMyaGwvZHM0elQvdHlhZSt0RjRBOHM3NFd6b1NadkpKc0hsUVJTb2tkVmV6VEg1OG85SmNYdVFmZWJkdzRBV0duRStoZW9qSGdTQjBGQVUrQW55K0VVUzc3bW9OVzMxTWFIT0I3d1IrZzg1Z3JPWVlwb0NVRitNNWlyZzJBN2U4QXZ3TFpKbTd0VXNmS3Jxdk1QMi9CZGx2cHVLTmJNYXBtbTFWK3NOQThpU1RuMXZ0ZVFFSHc5UC9Ja2VHNDdIODNJUGp0T0NRdFRMbWhYQklsT1V1RVdEcFNHRDBzTmhJSFdJdjQ0U1JmQW01V05WRXJpeDVTT1pWT3RaYm1LL2MvMDlQRkVnenpnTFcvL3ZSNlYrWW1xM1pBaFdUSGxXVmVTQVpLZFVpbGRwaXJXcEs2c1hjQkdtWFpjeXdMNzlPYmFKY0xTUWFyUm1TMHRSZ05WUXVjc2lZcy8="
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
