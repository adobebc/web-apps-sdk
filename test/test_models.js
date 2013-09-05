describe("Unit tests for BC models namespace.", function() {
	describe("Unit tests for BC base model class.", function() {
		var oldSiteHelper;
		
		beforeEach(function() {
			oldSiteHelper = BCAPI.Helper.Site;
			
			BCAPI.Mocks.Helper.Site(undefined, "123");
		});
		
		afterEach(function() {
			BCAPI.Helper.Site = oldSiteHelper;
		});
		
		it("Check default authorization site header", function() {
			var model = new BCAPI.Models.Model();
			
			var headers = model.headers();
			
			expect(headers.Authorization).toBe("123");
		});
	});
});