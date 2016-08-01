/* 
* 
* Copyright © 2016 Adobe. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
describe("Check webapp assign countries.", function() {
	var webappName = "WebAppCountriesApp",
		appCreated = undefined;
	
	var MAX_TIMEOUT = BCAPI.Config.MAX_TIMEOUT;
	
	function createApp() {
		var webapp = new BCAPI.Models.WebApp.App({"name": webappName});

		webapp.destroy().always(function() {
			webapp = new BCAPI.Models.WebApp.App({"name": webappName});
			
			webapp.save({
				success: function(webapp) {			
					webapp.fetch({
						success: function() {
							appCreated = webapp;
						}
					});
				}
			});			
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
