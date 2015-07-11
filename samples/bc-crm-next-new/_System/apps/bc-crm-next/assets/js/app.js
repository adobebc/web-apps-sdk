(function($) {
    var app = {
        init: function() {
            this._dataGrid = document.getElementById("gridCustomers");
            this._quickSearch = document.getElementById("tfQuickSearch");
            this._orderByDd = document.getElementById("ddOrderBy");
            this._orderByDdDynamic = document.getElementById("ddOrderByDynamic");
            this._filterValue = "";
            this._orderBy = "0";

            this._configureComponents();
            this._wireEvents();
        },
        _configureComponents: function() {
            this._dataGrid.configure({
                bcConfig: {
                    "siteUrl": "https://raducosnita-openplatform.worldsecuresystems.com",
                    "accessToken": "Bearer _bc_Q2xpZW50SWQ9dGhyLWdhLW1hbmFnZXI7NVRIYlNnZ2t6K3V5Tzk5eHVIcTBvMG16R3V5bC9aL1o1WUppRmZRS3lmeE9SckJiVVY5UkxsVjhnd1d0ZnM1UzhJd21QT0YzSkM3MExsRG5Eelo3Y2QyNG95VXB0Z0VXaHorYWtuaGVORk5HMzZkeHpGcjVxMy9yU2lXVHhYQzQ3eFRpNktCeUVDY0ZoQzRkc2xPTmkyY1NqYWFKc1dScWM1ZVNEdVFKT2FoOXZ2ZStHWEVFcmZCMzRsYWY4QmdNaDlOQkFhMDVxUDhscFVtcUFzQktEeWNkK0xUeS9veDU1NS9sVFZIZFJ2Ymd2TDlZeWFlSVhMS1BtdllsS3V3bXFzeFBJeFZUbm85LzhiTjRkKzZQcFJuV1IwVXF2SHBaSk5lL3JEeTFHS2tJMlE2Q3dDQm9Jc0JadHdaMjhtdlE="
                }
            });

            this._orderByDdDynamic.configure({
                items: [
                    {"value": "0", "text": "Order by"},
                    {"value": "id", "text": "Customer Id"},
                    {"value": "firstName", "text": "Order by"},
                    {"value": "middleName", "text": "Middle name"},
                    {"value": "lastName", "text": "Last name"},
                    {"value": "homePhone", "text": "Phone number"}
                ]
            });
        },
        _wireEvents: function() {
            var self = this;

            this._quickSearch.wireEvents({
                "textfield:change": function(evtData) {
                    self.onChangeSearch(evtData.value);
                },
                "textfield:search": function(evtData) {
                    self.onSearch(evtData.value);
                }
            });

            this._orderByDd.wireEvents({
                "dd:change": function(evtData) {
                    self.onChangeOrderBy(evtData);
                }
            });
        },
        onChangeOrderBy: function(selectedItem) {
            this._orderBy = selectedItem.value;

            this.onSearch(this._filterValue);
        },
        onChangeSearch: function(newFilterValue) {
            this._filterValue = newFilterValue;

            if (this._filterValue == "") {
                this.onSearch(this._filterValue);
            }
        },
        onSearch: function(filterValue) {
            this._dataGrid.searchFullText(filterValue, this._orderBy);
        }
    };

    app.init();
})($);