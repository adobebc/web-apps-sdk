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
describe("Unit tests for category model.", function() {
	var apiUrl = "https://blog-app-1234-apps.worldsecuresystem.com";
	
	beforeEach(function() {
		spyOn(BCAPI.Helper.Site, "getRootUrl").andCallFake(function() {
			return apiUrl;
		});
	});	
	
    it("Test Category Endpoint is correct", function() {
       var category = new BCAPI.Models.Category();
       var expectedEndpoint = "/api/v2/admin/sites/current/categories";
       expect(category.endpoint()).toBe(expectedEndpoint);
    });

    it("Test attribute setter, partial value preserves defaults", function() {
       var category = new BCAPI.Models.Category();
       var attributes = {
           id: 1,
           name: "Electronics"
       }
       category.set(attributes);
        _assertItemValues(category,attributes);
    });

    it("Test full values setter", function() {
        var category = new BCAPI.Models.Category();
        var attributes = {
            id: 1,
            name: "Electronics",
            parentId: 222,
            publicAccess: false
        }
        category.set(attributes);
        _assertItemValues(category, attributes);
    });

    it("Test values set via constructor match", function() {
        var attributes = {
            id: 1,
            name: "Electronics",
            parentId: 222,
            publicAccess: false
        }
        var category = new BCAPI.Models.Category(attributes);
        _assertItemValues(category, attributes);
    })

    it ("Test id is set properly", function(){
        var category = new BCAPI.Models.Category();
        category.set({id: 1});
        expect(category.id).toBe(1);
    });

    it("Test item url contains id", function() {
        var category = new BCAPI.Models.Category({id:1, name: "Test"}),
        	expectedUrl = [apiUrl, category.endpoint(), "/", category.id].join("");
        expect(category.url()).toBe(expectedUrl);
    });

    function _assertItemValues(item, values) {
        expect(item.get("name")).toBe(values.name);
        expect(item.get("parentId")).toBe(values.parentId);
        expect(item.get("publicAccess")).toBe(values.publicAccess);
    }
});
