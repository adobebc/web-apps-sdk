describe("Unit tests for webapp collection.", function() {	
	it("Check app collection instantiated ok.", function() {
		var appCollection = new BCAPI.Models.WebApp.AppCollection();
		
		expect(appCollection.model).toBe(BCAPI.Models.WebApp.App);
	});
	
	it("Check app collection url ok.", function() {
		var appCollection = new BCAPI.Models.WebApp.AppCollection(),
			rootUrl = "http://test.localhost.com",
			expectedBeginUrl = rootUrl + "/api/v2/admin/sites/current/webapps";
		
		BCAPI.Mocks.Helper.Site(undefined, undefined, rootUrl);
		
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
		
		BCAPI.Mocks.Helper.Site(undefined, siteToken, rootUrl);
		
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