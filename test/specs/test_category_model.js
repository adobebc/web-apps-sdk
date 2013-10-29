describe("Unit tests for category model.", function() {
	var apiUrl = "https://blog-app-1234-apps.worldsecuresystem.com";
	
	beforeEach(function() {
		spyOn(BCAPI.Helper.Site, "getRootUrl").andCallFake(function() {
			return apiUrl;
		});
	});	
	
    it("Test Category Endpoint is correct", function() {
       var category = new BCAPI.Models.Category();
       var expectedEndpoint = "/api/v2/admin/sites/current/categories";
       expect(category.endpoint()).toBe(expectedEndpoint);
    });

    it("Test attribute setter, partial value preserves defaults", function() {
       var category = new BCAPI.Models.Category();
       var attributes = {
           id: 1,
           name: "Electronics"
       }
       category.set(attributes);
        _assertItemValues(category,attributes);
    });

    it("Test full values setter", function() {
        var category = new BCAPI.Models.Category();
        var attributes = {
            id: 1,
            name: "Electronics",
            parentId: 222,
            publicAccess: false
        }
        category.set(attributes);
        _assertItemValues(category, attributes);
    });

    it("Test values set via constructor match", function() {
        var attributes = {
            id: 1,
            name: "Electronics",
            parentId: 222,
            publicAccess: false
        }
        var category = new BCAPI.Models.Category(attributes);
        _assertItemValues(category, attributes);
    })

    it ("Test id is set properly", function(){
        var category = new BCAPI.Models.Category();
        category.set({id: 1});
        expect(category.id).toBe(1);
    });

    it("Test item url contains id", function() {
        var category = new BCAPI.Models.Category({id:1, name: "Test"}),
        	expectedUrl = [apiUrl, category.endpoint(), "/", category.id].join("");
        expect(category.url()).toBe(expectedUrl);
    });

    function _assertItemValues(item, values) {
        expect(item.get("name")).toBe(values.name);
        expect(item.get("parentId")).toBe(values.parentId);
        expect(item.get("publicAccess")).toBe(values.publicAccess);
    }
});