describe("Unit tests for web app item collection.", function() {
	it("Test web app item instantiated correctly.", function() {
		var webappName = "Sample webapp",
			itemCollection = new BCAPI.Models.WebApp.ItemCollection(webappName);
		
		expect(itemCollection.webappName).toBe(webappName);
		expect(itemCollection.model).toBe(BCAPI.Models.WebApp.Item);
	});
	
	it("Test web app item endpoint ok.", function() {
		var webappName = "Sample webapp",
			rootUrl = "http://test.localhost.com/",
			expectedUrl = rootUrl + "api/v2/admin/sites/current/webapps/Sample webapp/items",
			item = new BCAPI.Models.WebApp.ItemCollection(webappName);
		
		BCAPI.Mocks.Helper.Site(undefined, undefined, rootUrl);
		
		expect(item.url()).toBe(expectedUrl);
	});
});