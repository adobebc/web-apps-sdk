describe("Unit tests for category model.", function() {

    it("Test Item Category Endpoint is correct", function() {
        var webappName = "Sample Test";
        var webappItemId = 123;

        var category = new BCAPI.Models.ItemCategory(webappName, webappItemId);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/items/" + webappItemId + "/categories";
        expect(category.endpoint()).toBe(expectedEndpoint);
    });

});