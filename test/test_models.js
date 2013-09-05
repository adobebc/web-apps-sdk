describe("Unit tests for BC models namespace.", function() {
	var PersonModel = BCAPI.Models.Model.extend({
		endpoint: function() {
			return "/api/v2/persons";
		}
	}); 
	
	describe("Unit tests for BC base model class.", function() {
		var oldSiteHelper,
			siteToken = "123",
			rootUrl = "https://secure.businesscatalyst.com/",
			expectedUrl = rootUrl + "api/v2/persons";
		
		beforeEach(function() {
			oldSiteHelper = BCAPI.Helper.Site;
			
			BCAPI.Mocks.Helper.Site(undefined, siteToken, rootUrl);
		});
		
		afterEach(function() {
			BCAPI.Helper.Site = oldSiteHelper;
		});
		
		it("Check default authorization site header", function() {
			var model = new PersonModel();
			
			var headers = model.headers();
			
			expect(headers.Authorization).toBe(siteToken);
		});
		
		it("Check attributes initialization through constructor.", function() {
			var model = new PersonModel({
				firstName: "John",
				lastName: "Doe"
			});
						
			expect(model.get("firstName")).toBe("John");
			expect(model.get("lastName")).toBe("Doe");			
		});
		
		it("Check attributes initialization through set.", function() {
			var model = new PersonModel();
			
			model.set({
				firstName: "John",
				lastName: "Doe"
			});
						
			expect(model.get("firstName")).toBe("John");
			expect(model.get("lastName")).toBe("Doe");			
		});
		
		it("Check url built ok.", function() {
			var model = new PersonModel();
			
			expect(model.url()).toBe(expectedUrl);
		});
		
		it("Check error raised if no endpoint defined.", function() {
			var model = new BCAPI.Models.Model();
			
			expect(model.endpoint).toThrow();
		});
		
		it("Check save operation ok.", function() {
			var model = new PersonModel({
				firstName: "John",
				lastName: "Doe"
			});

			spyOn($, "ajax").andCallFake(function(request) {
				expect(request.url).toBe(expectedUrl);
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