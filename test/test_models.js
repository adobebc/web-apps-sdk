describe("Unit tests for BC models namespace.", function() {
	describe("Unit tests for BC base model class.", function() {
		var oldSiteHelper;
		
		beforeEach(function() {
			oldSiteHelper = BCAPI.Helpers.Site;
			
			BCAPI.Mocks.Site.mock(undefined, "123");
		});
		
		afterEach(function() {
			BCAPI.Helpers.Site = oldSiteHelper;
		});
		
		it("Check default authorization site header", function() {
			var model = new BCAPI.Models.Model();
			
			var headers = model.headers();
			
			expect(headers.Authorization).toBe("123");
		});
	});
});