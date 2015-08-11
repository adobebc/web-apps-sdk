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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdJZFk2UFNGUkxiRXBNT0JsMFRROGx0Wm9ZcW9idVUyVUt4UGU4cWkrUDNsRndSenE5L0V2V3ZucGxHUVFjRUdjd0swZE9TZjRpZElJNkN2MWdUVlloUXlaQ3RiWVdDNlAwUjlJRXVFWllCSHlpUStqbWJKZFRTS3ZPS0RtSWVqQ3pVSFFRR3VsMFNaZFNpbjZhaktwc0dXa3JCVWx2cHhnQnZjajlQQjQrVnJUVUdpU1JLaWNWejdjK3Y1TXFmaTZlb3plYnZKSkdtZGtlcHZGSVpxMFdoR2NMUW1DMmx0SW1uMGVUNFVKVExTOFVXSHMxTFNGWEZQR09Zd3Zscy83TkQxclZXZ0prOUN4V01QSmllMjcyUTRsdVJKQmhkNTUzNVdhQ2VobEpyaGhKREdzYkhXZnI1NTVWZmZWL3FGeTRXY1JwWHlGWk5aZnlZcC9oOHAyNEl5Q2p5RzV1azZRUE1jU0NKeERTbzg="
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
