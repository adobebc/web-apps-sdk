describe("Unit tests for country model.", function() {

    it("Test collection endpoint is correct", function() {
        var countries = new BCAPI.Models.CountryCollection();
        var expectedUrl = new BCAPI.Models.Country().endpoint();
        expect(countries.url().substring(0, expectedUrl.length)).toBe(expectedUrl);
        expect(countries.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
        expect(countries.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);

    })
});