
describe("Unit tests for country model.", function() {
    it("Test Country Endpoint is correct", function() {
        var country = new BCAPI.Models.Country();
        var expectedEndpoint = "/api/v2/admin/system/countries";
        expect(country.endpoint()).toBe(expectedEndpoint);
    });

    it("Test attribute setter, partial value preserves defaults", function() {
        var country = new BCAPI.Models.Country();
        var attributes = {
            countryCode: "",
            displayName: ""
        }
        country.set(attributes);
        _assertItemValues(country,attributes);
    });

    function _assertItemValues(item, values) {
        expect(item.get("name")).toBe(values.name);
        expect(item.get("parentId")).toBe(values.parentId);
        expect(item.get("publicAccess")).toBe(values.publicAccess);
    }
});