describe("Unit tests for BC models namespace.", function() {
	describe("Unit tests for BC base model class.", function() {
		var oldSiteHelper,
			siteToken = "123",
			rootUrl = "https://secure.businesscatalyst.com/";
		
		beforeEach(function() {
			oldSiteHelper = BCAPI.Helper.Site;
			
			BCAPI.Mocks.Helper.Site(undefined, siteToken, rootUrl);
		});
		
		afterEach(function() {
			BCAPI.Helper.Site = oldSiteHelper;
		});
		
		it("Check default authorization site header", function() {
			var model = new BCAPI.Models.Model();
			
			var headers = model.headers();
			
			expect(headers.Authorization).toBe(siteToken);
		});
		
		it("Check attributes initialization through constructor.", function() {
			var model = new BCAPI.Models.Model({
				firstName: "John",
				lastName: "Doe"
			});
						
			expect(model.get("firstName")).toBe("John");
			expect(model.get("lastName")).toBe("Doe");			
		});
		
		it("Check attributes initialization through set.", function() {
			var model = new BCAPI.Models.Model();
			
			model.set({
				firstName: "John",
				lastName: "Doe"
			});
						
			expect(model.get("firstName")).toBe("John");
			expect(model.get("lastName")).toBe("Doe");			
		});
		
		it("Check save operation ok.", function() {
			var model = new BCAPI.Models.Model({
				firstName: "John",
				lastName: "Doe"
			});

			spyOn($, "ajax").andCallFake(function(request) {
				expect(request.url).toBe(rootUrl);
				expect(request.headers.Authorization).toBe(siteToken);
				expect(request.dataType).toBe("json");
				
				var data = JSON.parse(request.data);
				expect(data.firstName).toBe("John");
				expect(data.lastName).toBe("Doe");
				
				expect(request.contentType).toBe("application/json");
			});
						
			model.save();
		});
	});
});