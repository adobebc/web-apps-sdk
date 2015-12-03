window.MonitorApp = (function($) {

    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridMonitor");

            BCAPI.Security.configure(BCAPI.Security.getBcConfig());

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
