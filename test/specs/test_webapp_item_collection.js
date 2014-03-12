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
describe("Unit tests for web app item collection.", function() {
	it("Test web app item instantiated correctly.", function() {
		var webappName = "Sample webapp",
			itemCollection = new BCAPI.Models.WebApp.ItemCollection(webappName);
		
		expect(itemCollection.webappName).toBe(webappName);
		expect(itemCollection.model).toBe(BCAPI.Models.WebApp.Item);
	});
	
	it("Test web app item collection endpoint ok.", function() {
		var webappName = "Sample webapp",
			rootUrl = "http://test.localhost.com",
			expectedBeginUrl = rootUrl + "/api/v2/admin/sites/current/webapps/Sample webapp/items",
			item = new BCAPI.Models.WebApp.ItemCollection(webappName);
		
		BCAPI.Mocks.Helper.Site(undefined, rootUrl);
		
		expect(item.url().substring(0, expectedBeginUrl.length)).toBe(expectedBeginUrl);
		expect(item.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
		expect(item.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);
	});
	
	it("Test web app item collection fetch ok.", function() {
		var webappName = "Sample webapp",
			rootUrl = "http://test.localhost.com",
			expectedUrl = rootUrl + "/api/v2/admin/sites/current/webapps/" + webappName + "/items",
			item = new BCAPI.Models.WebApp.ItemCollection(webappName),
			siteToken = "12345xaz",
			successCalled = false,
			expectedItems = {"items": [{"id": 1, "name": "Item 1"}, 
			                           {"id": 1500, "name": "Item 2"}]};
		
		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
			
		function successHandler(collection, xhr, options) {
			expect(options.testKey).toBe("123");
			
			var idx = 0;
			
			collection.each(function(model) {
				expect(model.get("name")).toBe(expectedItems.items[idx].name);
				expect(model.get("id")).toBe(expectedItems.items[idx].id);
				expect(model.get("webapp").get("name")).toBe(webappName);
				
				idx++;
			});
			
			successCalled = true;
		}
		
		spyOn($, "ajax").andCallFake(function(request) {
			expect(request.url.substring(0, expectedUrl.length)).toBe(expectedUrl);
			expect(request.type).toBe("GET");
			expect(request.headers.Authorization).toBe(siteToken);
			
			request.success(expectedItems);
		});
		
		runs(function() {
			item.fetch({success: successHandler,
						testKey: "123"});
		});
		
		waitsFor(function() {
			return successCalled;
		}, "Success handler not called.", 50);
	});
});
