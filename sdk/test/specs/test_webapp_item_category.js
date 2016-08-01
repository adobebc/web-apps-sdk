/* 
* 
* Copyright © 2016 Adobe. All rights reserved.

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
describe("Unit tests for item category model.", function() {
    var siteToken = "123",
        rootUrl = "";

    beforeEach(function() {
        BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
    });

    it("Test Item Category Endpoint is correct", function() {
        var webappName = "Sample Test";
        var webappItemId = 123;

        var category = new BCAPI.Models.WebApp.ItemCategory(webappName, webappItemId);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/items/" + webappItemId + "/categories";
        expect(category.endpoint()).toBe(expectedEndpoint);
    });

    it("Test url does not contain additional data", function() {
        var webappName = "Sample Test";
        var webappItemId = 123;

        var category = new BCAPI.Models.WebApp.ItemCategory(webappName, webappItemId);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/items/" + webappItemId + "/categories";
        expect(category.url()).toBe(expectedEndpoint);

    });

    it("Test toJSON override returns the array alone", function() {
        var data = [1,2,3];
        var itemCategories = new BCAPI.Models.WebApp.ItemCategory("Sample App", 1, {items: [1,2,3]})
        expect(itemCategories.toJSON() instanceof Array).toBe(true);
        expect(itemCategories.toJSON().toString()).toBe(data.toString());
    });

    it("Test save calls a PUT method with the inner array", function() {
            var data = [1,2,3];
            var itemCategories = new BCAPI.Models.WebApp.ItemCategory("Sample App", 1, {items: [1,2,3]})
            var ajaxCalled = false;

            spyOn($, "ajax").andCallFake(function(request) {
                expect(request.type).toBe("PUT");
                expect(request.dataType).toBe("text");
                expect(request.data).toBe(JSON.stringify(data))
                ajaxCalled = true;
                
                return $.Deferred();
            });

            runs(function() {
                itemCategories.save();
            });

            waitsFor(function() {
                return ajaxCalled;
            }, "Not PUT method", 50);
    });

    if("Test default items is empty", function() {
       var itemCategories = new BCAPI.Models.WebApp.ItemCategory("sample", 1);
        expect(itemCategories.get('items') instanceof Array).toBe(true);
        expect(itemCategories.get('items').length).toBe(0);
    });
});
