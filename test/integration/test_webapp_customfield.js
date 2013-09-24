describe("Check webapp assign customfields.", function() {
    var webappName = "WebAppCustomfieldsApp",
        appCreated;

    var MAX_TIMEOUT = 5000;

    function createApp() {
        var webapp = new BCAPI.Models.WebApp.App({"name": webappName});

        appCreated = undefined;
        webapp.destroy().always(function() {
            webapp = new BCAPI.Models.WebApp.App({"name": webappName});
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

        _checkEmptyCustomFields();
        var expectedCustomFields = _createCustomFields();
        _checkCustomFields(expectedCustomFields);
    });

    function _checkEmptyCustomFields() {
        var webappCustomfieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection(webappName),
            customfieldsRetrievedEmpty = false;

        runs(function() {
            webappCustomfieldsCollection.fetch({
                success: function() {
                    customfieldsRetrievedEmpty = true;
                }
            });
        });

        waitsFor(function() {
            return customfieldsRetrievedEmpty;
        }, "Webapp " + webappName + " customfields not fetched correctly.", MAX_TIMEOUT);

        runs(function() {
            expect(webappCustomfieldsCollection.length).toBe(0);
        });

    };

    function _createCustomFields() {
        var customField1 = new BCAPI.Models.WebApp.CustomField(webappName, {
            "name"    : "Part code1",
            "type"    : "DropDown_List1",
            "listItems": ["First option", "Second one"],
            "required": true
        });

        var customField2 = new BCAPI.Models.WebApp.CustomField(webappName, {
            "name"    : "Part code2",
            "type"    : "DropDown_List2",
            "listItems": ["First option", "Second one"],
            "required": true
        });

        var customfieldsCreated = [customField1, customField2];
        return customfieldsCreated
    };

    function _checkCustomFields(expectedCustomfields) {
        var webappCustomfieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection(webappName),
            customfieldsFetched = undefined;

        runs(function() {
            webappCustomfieldsCollection.fetch({
                success: function(customfields) {
                    customfieldsFetched = customfields;
                }
            });
        });

        waitsFor(function() {
            return customfieldsFetched;
        }, "Webapp " + webappName + " customfields not parsed correctly.", MAX_TIMEOUT);

        runs(function() {
            var idx = 0;

            customfieldsFetched.each(function(item) {
                expect(expectedCustomfields[idx++]).toBe(item);
            });
        });
    };
});