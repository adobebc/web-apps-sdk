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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtY3JtLW5leHQ7WDBZSnF0R3dDVE85ZjM5ZGlIcm84b1dmaHRrWHpvNUZEaWpIcm1MSTBhVFBSQTJTVE9rNGtwaGk5UktqM050ZU5RbWZMMS9QemlDWTdZbTcxQUYwWDRuSXo5QVI5QmJMUDBWaHp5NjUxd2dWUmJoM3V0VTEwaTErWVZhbUQweVNPVWhHRkZNVXdPRmcyTWhPeUNuVm55bDBsYXJvT2J3NkVTM2NrTTQrS2hSMm9jaXVRbmxLK0Jxb2JwSm5uVlBhNWZGdlFDdnJsbWNWbm0za2VOYk82SUNIenNwdkJIMVRZTG9mcWovdHdaTlJHa0QvVG5VUWNPc1FSOTJLYkZZWWcwc2czUUYweFpLbGxUVzhmaTQxNzdYbllCT0tZa2VsbUZraXNpOWR4TFlCQVc2bHBTV2YrSDhQV0xRYWtZYVh1Q01yNWRYKyt5N05ZdWZwRk12dGs1RldHK2hiTHBadEk5UTkwb2x0ZzhZPQ=="
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
