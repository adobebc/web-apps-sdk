describe("Unit tests for BC base collection class.", function() {
	var oldSiteHelper = undefined,
		siteToken = "123",
		rootUrl = "https://secure.businesscatalyst.com/";

	beforeEach(function() {
		oldSiteHelper = BCAPI.Helper.Site;		
		
		BCAPI.Mocks.Helper.Site(undefined, siteToken, rootUrl);
	});
	
	afterEach(function() {
		expect(oldSiteHelper).not.toBe(undefined);
		
		BCAPI.Helper.Site = oldSiteHelper;
	});
	
	it("Check correct collection instantiation.", function() {		
		var collection = new BCAPI.Mocks.Models.PersonCollection();
		
		expect(collection.model).toBe(BCAPI.Mocks.Models.PersonModel);
		expect(collection._defaultLimit).toBe(BCAPI.Config.Pagination.limit);
		expect(collection._defaultSkip).toBe(BCAPI.Config.Pagination.skip);
	});
	
	it("Check correct collect url.", function() {
		var person = new BCAPI.Mocks.Models.PersonModel();
		var collection = new BCAPI.Mocks.Models.PersonCollection();
		
		expect(collection.url()).toBe(person.urlRoot());
	});
	
	it("Check correct collection fetch with default values..", function() {
		var personModel = new BCAPI.Mocks.Models.PersonModel(),
			collection = new BCAPI.Mocks.Models.PersonCollection(),
			expectedItems = [{"firstName": "John",
				 			  "lastName": "Doe"}], 
			callbackCalled = false;

		function successHandler(returnedCollection, response, options) {
			var idx = 0;
			
			returnedCollection.each(function(item) {
				var expectedItem = expectedItems[idx++];
				
				expect(item.get("firstName")).toBe(expectedItem.firstName);
				expect(item.get("lastName")).toBe(expectedItem.lastName);
			});
			
			callbackCalled = true;
		}
		
		spyOn($, "ajax").andCallFake(function(request) {
			var urlRoot = personModel.urlRoot();
			
			expect(request.url.substring(0, urlRoot.length + 1)).toBe(urlRoot + "?");
			expect(request.url).toContain("limit=" + BCAPI.Config.Pagination.limit);
			expect(request.url).toContain("skip=" + BCAPI.Config.Pagination.skip);
			expect(request.type).toBe("GET");
			expect(request.dataType).toBe("json");
			expect(request.headers.Authorization).toBe(siteToken);
			
			request.success(expectedItems);
		});
		
		runs(function() {
			collection.fetch({
				success: successHandler
		    });
		});
		
		waitsFor(function() {
			return callbackCalled;
		}, "Success callback not called.", 50);
	});
});