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
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9YmMtYXBpLWRpc2NvdmVyeTttb1ZzNmt5cDR4S3RkSEp2VEQ2U3lQU3J4RjhUUHd3UkYvTGpHVGFSZWVMUDJsRWNDbnNQZzhEbGJQTHNMUFg0bUdLVXk3akxvVmI1Y29UMkNzYmhteWVoL1huTzcxa3ZYWFRDOVZGeG1abjVPUWNMQWQ3Zmh5YlZVeUpyYVV2L2VOQmhwUlhxZG1zazNVOXhnV2kzVDlWalJEWDR1MEdBRnVXYWtVNWUxK05vLzJvN2lyUXNLb2kvQloyMVgycDl4a2lBbU5pWVVXaGxFYmpPNDA0MVBQSWoramJxWUZiTHJRenRINEdjOFZmcnNad2hta0YrU1RzQThmV01DTXZxb3lSVzlUWitLSk1hZHJBM2FLclZ6ckNRdURIdWx0d0xxd3NGOGNSbU1rbW9wMzFMQzU4VVZlNTBodmZPSXVUZUhKY2t3ZVdGMFMvQ2pFUEl6Zk54TGZLdkhmNG82ZWdBUStsNW9NSC9pWjVSMU8yY1g4ZHNNWUFlQUJQM1M4b00="
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
