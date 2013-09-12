describe("Unit tests for category model.", function() {

    it("Test collection edpoint is correct", function() {
        var categories = new BCAPI.Models.CategoryCollection();
        var expectedUrl = new BCAPI.Models.Category().endpoint();
        expect(categories.url().substring(0, expectedUrl.length)).toBe(expectedUrl);
        expect(categories.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
        expect(categories.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);

    })
});