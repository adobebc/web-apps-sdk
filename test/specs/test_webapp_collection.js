describe("Unit tests for webapp collection.", function() {
	var oldFieldCollection = undefined,
		expectedFields = [{"id": 1, "name": "Field 1", "type": "DataSource", "listItems": [1, 2, 3],
						   "required": false, "order": 5}, 
						  {"id": 1500, "name": "Field 2", "type": "String", "required": true}];
	
	beforeEach(function() {
		oldFieldCollection = BCAPI.Models.WebApp.CustomFieldCollection;
	});
	
	afterEach(function() {
		BCAPI.Models.WebApp.CustomFieldCollection = oldFieldCollection;
	});
	
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
		BCAPI.Models.WebApp.CustomFieldCollection = MockCustomFieldCollection;
		
		function successHandler(collection, xhr, options) {
			var idx = 0;
			
			expect(options.testKey).toBe(1234);
			expect(options.fetchFields).toBe(true);
			
			collection.each(function(model) {
				expect(model.get("id"), expectedApps.items[idx].id);
				expect(model.get("name"), expectedApps.items[idx].name);
				expect(model.get("slug"), expectedApps.items[idx].slug);
				
				fields = model.get("fields");
				expect(fields.length, expectedFields.length);
				
				var fieldIdx = 0;
				fields.each(function(field) {
					expect(field.get("webappName")).toBe(model.get("name"));
					expect(field.get("id")).toBe(expectedFields[fieldIdx].id);
					expect(field.get("name")).toBe(expectedFields[fieldIdx].name);
					expect(field.get("type")).toBe(expectedFields[fieldIdx].type);
					expect(field.get("listItems")).toBe(expectedFields[fieldIdx].listItems);
					expect(field.get("required")).toBe(expectedFields[fieldIdx].required);
					expect(field.get("order")).toBe(expectedFields[fieldIdx].order);
					
					fieldIdx++;
				});
				
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
				fetchFields: true,
				success: successHandler
			});
		});
		
		waitsFor(function() {
			return successCalled;
		}, "Success handler not called.", 50);
	});
	
	/**
	 * This is a simple mock object for custom field collection.
	 */
	function MockCustomFieldCollection(webappName, attributes) {
		this._webappName = webappName;
		this.attributes = attributes;
		this.length = expectedFields.length;
	}
	
	MockCustomFieldCollection.prototype.get = function(attr) {
		return this.attributes[attr];
	};
	
	MockCustomFieldCollection.prototype.fetch = function(options) {
		var fields = [],
			self = this;
		
		_.each(expectedFields, function(field) {
			fields.push(new BCAPI.Models.WebApp.CustomField(self._webappName, field));
		});
		
		this.each = function(callback) {
			_.each(fields, function(field) {
				callback(field);
			});
		};
		
		options.success(this, undefined, options);
	};
});