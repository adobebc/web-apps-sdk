describe("Unit tests for web app item model.", function() {
	it("Test web app item values set through constructor.", function() {
		var webappName = "Test webapp.",
			attributes = {"name": "Item 1",
						  "weight": null,
						  "releaseDate": "2013-01-01",
						  "expiryDate": "2014-01-01",
						  "enabled": false,
						  "slug": "/test/item3",
						  "description": "Simple item description",
						  "roleId": 12,
						  "submittedBy": 2,
						  "templateId": 5,
						  "address": "Test address",
						  "city": "San Francisco",
						  "state": "CA",
						  "zipCode": "CA00001",
						  "country": "US"},
			item = new BCAPI.Models.WebApp.Item(webappName, attributes);
		
		attributes["webappName"] = webappName;
		
		_assertItemValues(item, attributes);
	});
	
	it("Test web app item values set through setter.", function() {
		var webappName = "Test webapp.",
			attributes = {"name": "Item 1",
						  "weight": null,
						  "releaseDate": "2013-01-01",
						  "expiryDate": "2014-01-01",
						  "enabled": false,
						  "slug": "/test/item3",
						  "description": "Simple item description",
						  "roleId": 12,
						  "submittedBy": 2,
						  "templateId": 5,
						  "address": "Test address",
						  "city": "San Francisco",
						  "state": "CA",
						  "zipCode": "CA00001",
						  "country": "US"},
			item = new BCAPI.Models.WebApp.Item(webappName);
		
		item.set(attributes);
		attributes["webappName"] = webappName;
	
		_assertItemValues(item, attributes);		
	});
	
	it("Test web app item correct endpoint.", function() {
		var expectedEndpoint = "/api/v2/admin/sites/current/webapps/test webapp/items",
			item = new BCAPI.Models.WebApp.Item("test webapp");
		
		expect(item.endpoint()).toBe(expectedEndpoint);
	});
	
	/**
	 * This method assert that an web item attributes are equal with properties from values dictionary.
	 */
	function _assertItemValues(item, values) {
		var webapp = item.get("webapp");
		
		expect(item.get("name")).toBe(values.name);
		expect(item.get("weight")).toBe(values.weight);
		expect(item.get("releaseDate")).toBe(values.releaseDate);
		expect(item.get("expiryDate")).toBe(values.expiryDate);
		expect(item.get("enabled")).toBe(values.enabled);
		expect(item.get("slug")).toBe(values.slug);
		expect(item.get("description")).toBe(values.description);
		expect(item.get("role")).toBe(values.role);
		expect(item.get("submittedBy")).toBe(values.submittedBy);
		expect(item.get("templateId")).toBe(values.templateId);
		expect(item.get("address")).toBe(values.address);
		expect(item.get("city")).toBe(values.city);
		expect(item.get("state")).toBe(values.state);
		expect(item.get("country")).toBe(values.country);
		
		expect(item.get("webapp")).not.toBe(undefined);		
		expect(webapp.get("name")).toBe(values.webappName);		
	}
});