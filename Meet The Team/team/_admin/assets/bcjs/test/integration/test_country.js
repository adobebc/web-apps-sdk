describe("Check country model collection integration.", function() {
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
    });
    
    it("Check country listing works as expected.", function() {
    	var countryCollection = new BCAPI.Models.CountryCollection(),
    		fetchedCollection = undefined,
    		foundCountries = {};
    	
    	runs(function() {
    		countryCollection.fetch({
    			success: function(countries) {
    				fetchedCollection = countries;
    			}
    		});    		
    	});
    	
    	waitsFor(function() {
    		return fetchedCollection;
    	}, "List of countries not fetched.", 2000);
    	
    	runs(function() {
			expect(fetchedCollection.length).toBe(241);
    					
    		fetchedCollection.each(function(country) {
    			foundCountries[country.get("countryCode")] = country.get("displayName");
    		});
    		    	
			console.log(foundCountries);    		
    		expect(foundCountries.AU).toBe("Australia");
    		expect(foundCountries.RO).toBe("Romania");
    		expect(foundCountries.US).toBe("United States");
    	});
    });
});