describe("Unit tests for custom field collection.", function() {
	it("Test custom field collection instantiated correctly.", function() {
		var webappName = "Sample webapp",
			fieldCollection = new BCAPI.Models.WebApp.CustomFieldCollection(webappName);
		
		expect(fieldCollection.model).toBe(BCAPI.Models.WebApp.CustomField);
	});
	
	it("Test custom field collection endpoint ok.", function() {
		var webappName = "Sample webapp",
			rootUrl = "http://test.localhost.com",
			expectedBeginUrl = rootUrl + "/api/v2/admin/sites/current/webapps/Sample webapp/fields",
			fieldCollection = new BCAPI.Models.WebApp.CustomFieldCollection(webappName);
		
		BCAPI.Mocks.Helper.Site(undefined, rootUrl);
		
		expect(fieldCollection.url().substring(0, expectedBeginUrl.length)).toBe(expectedBeginUrl);
		expect(fieldCollection.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
		expect(fieldCollection.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);
	});	
	
	it("Test custom field collection fetch ok.", function() {
		var webappName = "Sample webapp",
			rootUrl = "http://test.localhost.com",
			expectedUrl = rootUrl + "/api/v2/admin/sites/current/webapps/" + webappName + "/fields",
			fieldCollection = new BCAPI.Models.WebApp.CustomFieldCollection(webappName),
			siteToken = "12345xaz",
			successCalled = false,
			expectedFields = {"items": [{"id": 1, "name": "Field 1", "type": "DataSource", "listItems": [1, 2, 3],
										"required": false, "order": 5}, 
			                           {"id": 1500, "name": "Field 2", "type": "String", "required": true}]};
		
		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
			
		function successHandler(collection, xhr, options) {
			expect(options.testKey).toBe("123");
			
			var idx = 0;
			
			collection.each(function(model) {
				expect(model.get("name")).toBe(expectedFields.items[idx].name);
				expect(model.get("id")).toBe(expectedFields.items[idx].id);
				expect(model.get("type")).toBe(expectedFields.items[idx].type);
				expect(model.get("listItems")).toBe(expectedFields.items[idx].listItems);
				expect(model.get("required")).toBe(expectedFields.items[idx].required);
				expect(model.get("order")).toBe(expectedFields.items[idx].order);
				expect(model.get("webapp").get("name")).toBe(webappName);
				
				idx++;
			});
			
			successCalled = true;
		}
		
		spyOn($, "ajax").andCallFake(function(request) {
			expect(request.url.substring(0, expectedUrl.length)).toBe(expectedUrl);
			expect(request.type).toBe("GET");
			expect(request.headers.Authorization).toBe(siteToken);
			
			request.success(expectedFields);
		});
		
		runs(function() {
			fieldCollection.fetch({success: successHandler,
								   testKey: "123"});
		});
		
		waitsFor(function() {
			return successCalled;
		}, "Success handler not called.", 50);
	});	
});