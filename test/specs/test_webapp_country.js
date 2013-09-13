describe("Unit tests for webapp country.", function() {
    it("Test webapp country instantiated correctly.", function() {
        var webappName = "Sample webapp",
            countryCollection = new BCAPI.Models.WebApp.Country(webappName);

        expect(countryCollection._webappName).toBe(webappName);
    });

    it("Test webapp country endpoint ok.", function() {
        var webappName = "Sample webapp",
            rootUrl = "http://test.localhost.com",
            expectedBeginUrl = rootUrl + "/api/v2/admin/sites/current/webapps/Sample webapp/countries",
            countryCollection = new BCAPI.Models.WebApp.Country(webappName);

        BCAPI.Mocks.Helper.Site(undefined, undefined, rootUrl);

        expect(countryCollection.url().substring(0, expectedBeginUrl.length)).toBe(expectedBeginUrl);
    });
/*
    it("Test toJSON override returns the array alone", function() {
        var data = ['US','UK','RO'];
        var countries = new BCAPI.Models.WebApp.Country("Sample App", 1, {items: ['US','UK','RO']})
        expect(countries.toJSON() instanceof Array).toBe(true);
        expect(countries.toJSON().toString()).toBe(data.toString());
    });

    it("Test save calls a PUT method with the inner array", function() {
        var data = ['US','UK','RO'];
        var countries = new BCAPI.Models.WebApp.Country("Sample App", 1, {items: ['US','UK','RO']})
        var ajaxCalled = false;

        spyOn($, "ajax").andCallFake(function(request) {
            expect(request.type).toBe("PUT");
            expect(request.dataType).toBe("text");
            expect(request.data).toBe(JSON.stringify(data))
            ajaxCalled = true;
        });

        runs(function() {
            countries.save();
        });

        waitsFor(function() {
            return ajaxCalled;
        }, "Not PUT method", 50);
    });*/

    if("Test default items is empty", function() {
        var countries = new BCAPI.Models.WebApp.Country("sample", 1);
        expect(countries.get('items') instanceof Array).toBe(true);
        expect(countries.get('items').length).toBe(0);
    });

});