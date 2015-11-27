window.MonitorApp = (function($) {

    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridMonitor");

            BCAPI.Security.configure({
                "siteUrl": "https://site4-2.localbc.worldsecuresystems.com",
                "accessToken": "Bearer _bc_Q2xpZW50SWQ9cGFydG5lcjQtYWFhO1k2UGFQcTZlYnBnVlpkd0lYNlJ5UW42b2gwNlI5QjdLdTd4SUxQdEpzMXN1eFF4aVVYenB5N1JPYU56VFNzS3pMTW14MWtlVk05ZTFwSDRpRnZMSHRNVHR5VGF4SHdieFpBT1kybCtCOE5xQlpYbFJrTkljdnFQOHkybEJzUHZtSkR2bEpnc3VpaFFFeGhiV0pJMVV5NHRtUmlLa0xXY0ErVUo1VlREU0FpTXd4aS9TRlNSRkNuTS9wcmV2RUtEb2NrWDd4QytqNkJyYWlFRC9WSEM4bVFNYTd2cHhjcEJNSE43Q2xuZVQzZEQ1VEZremJTL1VRU1Y3ektuT1U2cUJFZHJGOG1yYUZPRVRYNW5zZ0VkYjloelNIWE1uLys0RndwNjIrVUZDUi93ZlhIMWRQQUJGMmxQTDRvVUdOeVF3WDQ3M3VSR1BnQjFaQ3lQdEswZ0tUelZtRWN3aitKQis3bUhLbmFxV3pvST0="
            });

            this._dataGrid.configure();
        },
        showMonitorDetails: function(srcElement) {
            var selectedMonitor = srcElement.data,
                monitorGridSelector = "bc-datagrid[data-monitor-sid='" + selectedMonitor.guid + "']",
                monitorGrid = $(monitorGridSelector)[0],
                visible = !monitorGrid.visible;

            monitorGrid.dataSource.configure({
                "resourceId": selectedMonitor.guid
            });

            monitorGrid.configure();
            monitorGrid.display(visible);
        },
        monitorResultsSelector: function(evtCtx) {
            var newData = [];
            for (var key in evtCtx.result.monitorResponse) {

                var apiDescriptor = evtCtx.result.monitorResponse[key];
                apiDescriptor.api = key;
                apiDescriptor.lastResponse = JSON.stringify(apiDescriptor.lastResponse, null, 4); 

                newData.push(apiDescriptor);
            }
            evtCtx.result = newData;
        }
    };

    return app;
})($);

document.addEventListener("WebComponentsReady", function() {
    MonitorApp.init();
});
