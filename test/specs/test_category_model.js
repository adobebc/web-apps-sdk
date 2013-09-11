describe("Unit tests for category model.", function() {
    it("Test Category model defaults", function() {
       var category = new BCAPI.Models.Category();
       var defaultValues = {
           name: "",
           parentId: -1,
           publicAccess: true
       }

       _assertItemValues(category, defaultValues);
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
       var expectedAttributes = _.extend(attributes,  {parentId: -1, publicAccess: true})
        _assertItemValues(category,expectedAttributes);
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
        var category = new BCAPI.Models.Category({id:1, name: "Test"});
        expect(category.url()).toBe(category.endpoint() + "/" + category.id);
    });

    function _assertItemValues(item, values) {
        expect(item.get("name")).toBe(values.name);
        expect(item.get("parentId")).toBe(values.parentId);
        expect(item.get("publicAccess")).toBe(values.publicAccess);
    }
});