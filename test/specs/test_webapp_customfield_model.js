describe("Unit tests for webapp custom field model.", function() {
	it("Check custom field correct url.", function() {
		var webappName = "Test webapp",
			expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/fields",	
			field = new BCAPI.Models.WebApp.CustomField(webappName);
		
		expect(field.endpoint()).toBe(expectedEndpoint);
	});
	
	it("Check custom field instantiation ok.", function() {
		var webappName = "Test webapp",
			values = {"name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName, values);
		
		_assertCustomFieldValues(field, values);
	});
	
	it("Check custom field set ok.", function() {
		var webappName = "Test webapp",
			values = {"name": "Custom field 1",
					  "type": "Boolean",
					  "required": true,
					  "order": 5,
					  "dataSourceName": "Simple Data Source",
					  "listItems": [1, 2, 3]},
			field = new BCAPI.Models.WebApp.CustomField(webappName);
		
		field.set(values);
		
		_assertCustomFieldValues(field, values);		
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