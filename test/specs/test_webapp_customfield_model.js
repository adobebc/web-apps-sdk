describe("Unit tests for webapp custom field model.", function() {
	it("Check custom field correct url.", function() {
		var webappName = "Test webapp",
			expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/fields",	
			expectedId = 5,
			field = new BCAPI.Models.WebApp.CustomField(webappName, {id: expectedId});
		
		expect(field.endpoint()).toBe(expectedEndpoint);
		expect(field.get("id")).toBe(expectedId);
	});
	
	it("Check custom field instantiation ok with number id.", function() {
		var webappName = "Test webapp",
			expectedId = 63563,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName, values);
		
		_assertCustomFieldValues(field, values);
	});
	
	it("Check custom field instantiation ok with string id that is a number.", function() {
		var webappName = "Test webapp",
			expectedId = "63563",
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName, values);
		
		_assertCustomFieldValues(field, values);
	});

	it("Check custom field instantiation ok with string id that is a number with spaces.", function() {
		var webappName = "Test webapp",
			expectedId = "  63563 ",
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName, values);
		
		_assertCustomFieldValues(field, values);
	});

	it("Check custom field instantiation failure with string id that is a number with spaces.", function() {
		var webappName = "Test webapp",
			expectedId = "  63 563 ",
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with negative id", function() {
		var webappName = "Test webapp",
			expectedId = -1223,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with negative id as string", function() {
		var webappName = "Test webapp",
			expectedId = "-1223",
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with null id", function() {
		var webappName = "Test webapp",
			expectedId = null,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with NaN id", function() {
		var webappName = "Test webapp",
			expectedId = NaN,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with undefined id", function() {
		var webappName = "Test webapp",
			expectedId = undefined,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with missing id", function() {
		var webappName = "Test webapp",
			values = {"name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]};

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});

	it("Check custom field instantiation failure with missing attributes", function() {
		var webappName = "Test webapp",
			values = null;

		expect(function() {new BCAPI.Models.WebApp.CustomField(webappName, values)}).toThrow()
	});
	
	it("Check custom field set ok.", function() {
		var webappName = "Test webapp",
			expectedId = 63563,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName, {id: 5});
		
		field.set(values);
		
		_assertCustomFieldValues(field, values);		
	});

	it("Check save for new custom field", function() {
		var webappName = "Test webapp",
			expectedId = 63563,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			rootUrl = "http://test.localhost.com",
			expectedUrl = rootUrl + "/api/v2/admin/sites/current/webapps/" + webappName + "/fields",
			siteToken = "12345xaz",
			field = new BCAPI.Models.WebApp.CustomField(webappName, values),
			successCalled = false;

		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);

		var successHandler = function(model, response, options) {
			expect(model.get("id")).toBe(values.id);
			expect(model.get("name")).toBe(values.name);
			expect(model.get("type")).toBe(values.type);
			expect(model.get("required")).toBe(values.required);
			expect(model.get("order")).toBe(values.order);
			expect(model.get("dataSourceName")).toBe(values.dataSourceName);
			expect(model.get("listItems")).toBe(values.listItems);

			successCalled = true;
		};

		spyOn($, "ajax").andCallFake(function(request) {
			expect(request.url).toBe(expectedUrl);
			expect(request.type).toBe("POST");
			expect(request.headers.Authorization).toBe(siteToken);
			
			request.success(field);

			return $.Deferred();
		});

		field.save({ success: successHandler });

		waitsFor(function() { return successCalled; }, "Success handler not called.", 50);
	});

	it("Check save for existing custom field", function() {
		var webappName = "Test webapp",
			expectedId = 63563,
			values = {"id": expectedId,
					  "name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			rootUrl = "http://test.localhost.com",
			expectedUrl = rootUrl + "/api/v2/admin/sites/current/webapps/" + webappName + "/fields/" + expectedId,
			siteToken = "12345xaz",
			field = new BCAPI.Models.WebApp.CustomField(webappName, values, false),
			successCalled = false;

		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);

		var successHandler = function(model, response, options) {
			expect(model.get("id")).toBe(values.id);
			expect(model.get("name")).toBe(values.name);
			expect(model.get("type")).toBe(values.type);
			expect(model.get("required")).toBe(values.required);
			expect(model.get("order")).toBe(values.order);
			expect(model.get("dataSourceName")).toBe(values.dataSourceName);
			expect(model.get("listItems")).toBe(values.listItems);

			successCalled = true;
		};

		spyOn($, "ajax").andCallFake(function(request) {
			expect(request.url).toBe(expectedUrl);
			expect(request.type).toBe("PUT");
			expect(request.headers.Authorization).toBe(siteToken);
			
			request.success(field);

			return $.Deferred();
		});

		field.save({ success: successHandler });

		waitsFor(function() { return successCalled; }, "Success handler not called.", 50);
	});
	
	/**
	 * This method assert that field properties equals given values.
	 */
	function _assertCustomFieldValues(field, values) {
		for(var key in values) {
			expect(field.get(key)).toBe(values[key]);
		}
	}
});