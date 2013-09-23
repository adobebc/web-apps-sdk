describe("Check webapp assign customfields.", function() {
    var webappName = "WebAppCustomfieldsApp",
        appCreated;

    var MAX_TIMEOUT = 5000;

    function createApp() {
        var webapp = new BCAPI.Models.WebApp.App({"name": webappName});

        appCreated = undefined;
        webapp.destroy().always(function() {
            webapp = new BCAPI.Models.WebApp.App({"name": webappName})
            webapp.save().then(function() {
                return webapp.fetch();
            }).then(function() {
                appCreated = webapp;
            })
        });

    }

    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();

        runs(createApp);

        waitsFor(function() {
            return appCreated;
        }, "Webapp " + webappName + " not created correctly.", MAX_TIMEOUT);
    });

    afterEach(function() {
        appCreated.destroy();
    });


    it("Check webapp customfields update.", function() {
       // var expectedCustomFields = ["String", "String", "String"];
        var expectedCustomFields = new BCAPI.Models.WebApp.CustomField("WebAppCustomfieldsApp", {
            "name"    : "Part code",
            "type"    : "DropDown_List",
            "listItems": ["First option", "Second one"],
            "required": true
        });

        _checkEmptyCustomFields();
        _updateCustomFields(expectedCustomFields);
        _checkCustomFields(expectedCustomFields);
    });

    function _checkEmptyCustomFields() {
        var webappCustomfields = new BCAPI.Models.WebApp.CustomField(webappName),
            customfieldsRetrievedEmpty = false;

        runs(function() {
            webappCustomfields.fetch({
                success: function() {
                    customfieldsRetrievedEmpty = true;
                }
            });
        });

        waitsFor(function() {
            return customfieldsRetrievedEmpty;
        }, "Webapp " + webappName + " customfields not fetched correctly.", MAX_TIMEOUT);

        runs(function() {
            expect(webappCustomfields.get("items").length).toBe(0);
        });
    };

    function  _updateCustomFields(expectedCustomfields) {
        var webappCustomfields = new BCAPI.Models.WebApp.CustomField(webappName, expectedCustomfields),
            customfieldsUpdated = false;

        runs(function() {
            webappCustomfields.save({
                success: function() {
                    customfieldsUpdated = true;
                }
            });
        });

        waitsFor(function() {
            return customfieldsUpdated;
        }, "Webapp " + webappName + " customfields not updated correctly.", MAX_TIMEOUT);
    };

    function _checkCustomFields(expectedCustomfields) {
        var webappCustomfields = new BCAPI.Models.WebApp.CustomField(webappName),
            customfieldsFetched = undefined;

        runs(function() {
            webappCustomfields.fetch({
                success: function(customfields) {
                    customfieldsFetched = customfields;
                }
            });
        });

        waitsFor(function() {
            return customfieldsFetched;
        }, "Webapp " + webappName + " customfields not fetched correctly.", MAX_TIMEOUT);

        runs(function() {
            var idx = 0;

            _.each(customfieldsFetched.get(), function(item) {
                expect(expectedCustomfields[idx++]).toBe(item);
            });
        });
    };
});