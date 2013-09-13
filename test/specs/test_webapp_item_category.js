describe("Unit tests for item category model.", function() {
    var oldSiteHelper = undefined,
        siteToken = "123",
        rootUrl = "";

    beforeEach(function() {
        BCAPI.Mocks.Helper.Site(null, siteToken, rootUrl);
    });

    it("Test Item Category Endpoint is correct", function() {
        var webappName = "Sample Test";
        var webappItemId = 123;

        var category = new BCAPI.Models.ItemCategory(webappName, webappItemId);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/items/" + webappItemId + "/categories";
        expect(category.endpoint()).toBe(expectedEndpoint);
    });

    it("Test url does not contain additional data", function() {
        var webappName = "Sample Test";
        var webappItemId = 123;

        var category = new BCAPI.Models.ItemCategory(webappName, webappItemId);
        var expectedEndpoint = "/api/v2/admin/sites/current/webapps/" + webappName + "/items/" + webappItemId + "/categories";
        expect(category.url()).toBe(expectedEndpoint);

    });

    it("Test toJSON override returns the array alone", function() {
        var data = [1,2,3];
        var itemCategories = new BCAPI.Models.ItemCategory("Sample App", 1, {items: [1,2,3]})
        expect(itemCategories.toJSON() instanceof Array).toBe(true);
        expect(itemCategories.toJSON().toString()).toBe(data.toString());
    });

    it("Test save calls a PUT method with the inner array", function() {
            var data = [1,2,3];
            var itemCategories = new BCAPI.Models.ItemCategory("Sample App", 1, {items: [1,2,3]})
            var ajaxCalled = false;

            spyOn($, "ajax").andCallFake(function(request) {
                expect(request.type).toBe("PUT");
                expect(request.dataType).toBe("text");
                expect(request.data).toBe(JSON.stringify(data))
                ajaxCalled = true;
            });

            runs(function() {
                itemCategories.save();
            });

            waitsFor(function() {
                return ajaxCalled;
            }, "Not PUT method", 50);
    });

    if("Test default items is empty", function() {
       var itemCategories = new BCAPI.Models.ItemCategory("sample", 1);
        expect(itemCategories.get('items') instanceof Array).toBe(true);
        expect(itemCategories.get('items').length).toBe(0);
    });
});