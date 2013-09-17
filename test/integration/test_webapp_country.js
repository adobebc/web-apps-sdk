describe("Check webapp countries API.", function() {
	var webappName = "WebAppCountriesApp",
		appCreated = undefined;
	
	var MAX_TIMEOUT = 2000;
	
	function createApp() {
		var webapp = new BCAPI.Models.WebApp.App({"name": webappName});
		
		webapp.save({
			success: function(webapp) {			
				webapp.fetch({
					success: function() {
						appCreated = webapp;
					}
				});
			}
		});
	}
	
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
        
        runs(createApp);
        
        waitsFor(function() {
        	return appCreated;
        }, "Webapp " + webappName + " not created correctly.", MAX_TIMEOUT);
    });
    
    afterEach(function() {
  		appCreated.destroy();
    });
	
	
	it("Check webapp countries update.", function() {
		var expectedCountries = ["RO", "US", "GB"];	
		
		_checkEmptyCountries();
		_updateCountries(expectedCountries);
		_checkCountries(expectedCountries);
	});
	
	function _checkEmptyCountries() {
		var webappCountries = new BCAPI.Models.WebApp.Country(webappName),
			countriesRetrievedEmpty = false;
		
		runs(function() {
			webappCountries.fetch({
				success: function() {
					countriesRetrievedEmpty = true;
				}
			});
		});
		
		waitsFor(function() {
			return countriesRetrievedEmpty;
		}, "Webapp " + webappName + " countries not fetched correctly.", MAX_TIMEOUT);
		
		runs(function() {
			expect(webappCountries.get("items").length).toBe(0);
		});		
	};
	
	function _updateCountries(expectedCountries) {
		var webappCountries = new BCAPI.Models.WebApp.Country(webappName, {"items": expectedCountries}),
			countriesUpdated = false;
		
		runs(function() {
			webappCountries.save({
				success: function() {
					countriesUpdated = true;
				}
			});
		});
		
		waitsFor(function() {
			return countriesUpdated;
		}, "Webapp " + webappName + " countries not updated correctly.", MAX_TIMEOUT);
	};
	
	function _checkCountries(expectedCountries) {
		var webappCountries = new BCAPI.Models.WebApp.Country(webappName),
			countriesFetched = undefined;
		
		runs(function() {
			webappCountries.fetch({
				success: function(countries) {
					countriesFetched = countries;
				}
			});
		});
		
		waitsFor(function() {
			return countriesFetched;
		}, "Webapp " + webappName + " countries not fetched correctly.", MAX_TIMEOUT);
		
		runs(function() {
			var idx = 0;
			
			_.each(countriesFetched.get("items"), function(item) {
				expect(expectedCountries[idx++]).toBe(item);
			});
		});
	};
});