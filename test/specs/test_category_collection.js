describe("Unit tests for category model.", function() {
	var apiUrl = "https://blog-app-1234-apps.worldsecuresystem.com";
	
	beforeEach(function() {
		spyOn(BCAPI.Helper.Site, "getRootUrl").andCallFake(function() {
			return apiUrl;
		});
	});
	
    it("Test collection edpoint is correct", function() {
        var categories = new BCAPI.Models.CategoryCollection();
        var expectedUrl = apiUrl + new BCAPI.Models.Category().endpoint();
        expect(categories.url().substring(0, expectedUrl.length)).toBe(expectedUrl);
        expect(categories.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
        expect(categories.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);

    })
});