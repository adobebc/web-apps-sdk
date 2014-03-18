/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
describe("Unit tests for webapp country.", function() {
    "use strict";

    var oldSiteHelper = undefined,
        siteToken = "123",
        rootUrl = "";

    beforeEach(function() {
        BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
    });

    it("Test webapp country instantiated correctly.", function() {
        var webappName = "Sample webapp",
            countryCollection = new BCAPI.Models.WebApp.Country(webappName);

        expect(countryCollection._webappName).toBe(webappName);
    });

    it("Test webapp country endpoint ok.", function() {
        var webappName = "Sample webapp",
            countryCollection = new BCAPI.Models.WebApp.Country(webappName);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/countries";
        expect(countryCollection.endpoint()).toBe(expectedEndpoint);
    });

    it("Test toJSON override returns the array alone", function() {
        var data = ['US','UK','RO'];
        var countries = new BCAPI.Models.WebApp.Country("Sample App", {items: ['US','UK','RO']});
        expect(countries.toJSON() instanceof Array).toBe(true);
        expect(countries.toJSON().toString()).toBe(data.toString());
    });

    it("Test save calls a PUT method with the inner array", function() {
        var data = ["US","UK","RO"];
        var countries = new BCAPI.Models.WebApp.Country("Sample App", {items: ["US","UK","RO"]});
        var ajaxCalled = false;

        spyOn($, "ajax").andCallFake(function(request) {
            expect(request.type).toBe("PUT");
            expect(request.dataType).toBe("text");
            expect(request.data).toBe(JSON.stringify(data));
            ajaxCalled = true;

            return $.Deferred();
        });

        runs(function() {
            countries.save();
        });

        waitsFor(function() {
            return ajaxCalled;
        }, "Not PUT method", 500);
    });

    if("Test default items is empty", function() {
        var countries = new BCAPI.Models.WebApp.Country("sample", 1);
        expect(countries.get('items') instanceof Array).toBe(true);
        expect(countries.get('items').length).toBe(0);
    });

});
