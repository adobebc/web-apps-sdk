describe("Unit tests for country model.", function() {
	var apiUrl = "https://blog-app-1234-apps.worldsecuresystem.com";
	
	beforeEach(function() {
		spyOn(BCAPI.Helper.Site, "getRootUrl").andCallFake(function() {
			return apiUrl;
		});
	});
	
    it("Test collection endpoint is correct", function() {
        var countries = new BCAPI.Models.CountryCollection(),
        	expectedUrl = apiUrl + new BCAPI.Models.Country().endpoint();
        
        expect(countries.url().substring(0, expectedUrl.length)).toBe(expectedUrl);
        expect(countries.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
        expect(countries.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);

    })
});