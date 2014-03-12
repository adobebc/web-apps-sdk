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
describe("Unit tests for webapp collection.", function() {	
	it("Check app collection instantiated ok.", function() {
		var appCollection = new BCAPI.Models.WebApp.AppCollection();
		
		expect(appCollection.model).toBe(BCAPI.Models.WebApp.App);
	});
	
	it("Check app collection url ok.", function() {
		var appCollection = new BCAPI.Models.WebApp.AppCollection(),
			rootUrl = "http://test.localhost.com",
			expectedBeginUrl = rootUrl + "/api/v2/admin/sites/current/webapps";
		
		BCAPI.Mocks.Helper.Site(undefined, rootUrl);
		
		expect(appCollection.url().substring(0, expectedBeginUrl.length)).toBe(expectedBeginUrl);
		expect(appCollection.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
		expect(appCollection.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);
	});
	
	it("Check app collection fetch ok.", function() {
		var appCollection = new BCAPI.Models.WebApp.AppCollection(),
			siteToken = "12345xxaz",
			rootUrl = "http://test.localhost.com",
			expectedUrl = rootUrl + "/api/v2/admin/sites/current/webapps",
			expectedApps = {"items": [{"id":346, "name":"BC Friends", "slug":"bc-friends"},
			                          {"id":356, "name":"BC Help", "slug":"bc-help"}]},
			successCalled = false;
		
		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
		
		function successHandler(collection, xhr, options) {
			var idx = 0;
			
			expect(options.testKey).toBe(1234);
			
			collection.each(function(model) {
				expect(model.get("id"), expectedApps.items[idx].id);
				expect(model.get("name"), expectedApps.items[idx].name);
				expect(model.get("slug"), expectedApps.items[idx].slug);
				
				idx++;
			});
			
			successCalled = true;
		}
		
		spyOn($, "ajax").andCallFake(function(request) {
			expect(request.url.substring(0, expectedUrl.length)).toBe(expectedUrl);
			expect(request.type).toBe("GET");
			expect(request.headers.Authorization).toBe(siteToken);
						
			request.success(expectedApps);
		});
		
		runs(function() {
			appCollection.fetch({
				testKey: 1234,
				success: successHandler
			});
		});
		
		waitsFor(function() {
			return successCalled;
		}, "Success handler not called.", 50);
	});
});
