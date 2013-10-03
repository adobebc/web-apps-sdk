describe("Check webapp item assign categories.", function() {
	var webappName = "WebAppItemsCategoryApp",
		appCreated = undefined,
		expectedCategories = undefined,
		itemId = undefined;

	var MAX_TIMEOUT = 6000;
	
	function createApp() {
		var webapp = new BCAPI.Models.WebApp.App({"name": webappName});
		
		webapp.destroy().always(function() {
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
		});
	}
	
	function retrieveCategories() {
    	var categoryCollection = new BCAPI.Models.CategoryCollection();
    	
    	categoryCollection.fetch({
    		success: function(categories) {
    			expectedCategories = [];
    			
    			categories.each(function(category) {
    				expectedCategories.push(category.get("id"));
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
	    
	    runs(retrieveCategories);
	    
	    waitsFor(function() {
	    	return expectedCategories;
	    }, "Site categories not retrieved correctly.", MAX_TIMEOUT);
	});
	
    afterEach(function() {
    	appCreated.destroy();
    });
    
    it("Check existing item assign category.", function() {
    	var itemName = "Test item";
    	
    	_createTestItem(itemName);
    	_assignCategories(itemName);
    	_assertCorrectAssignment(itemName);
    });
    
    function _createTestItem(itemName) {
		var item = new BCAPI.Models.WebApp.Item(webappName, {"name": itemName}),
			itemCreated = false;
	
		runs(function() {
			item.save({
				success: function() {
					itemCreated = true;
				}
			});
		});
		
		waitsFor(function() {
			return itemCreated;
		}, "Item " + itemName + " not created correctly.", MAX_TIMEOUT);    	
    }
        
    function _assignCategories(itemName) {
    	var itemsCollection = new BCAPI.Models.WebApp.ItemCollection(webappName),
    		categoriesAssigned = false;
    	
    	runs(function() {
    		itemsCollection.fetch({
	    		success: function(items) {
	    			items.each(function(item) {
	    				if(item.get("name") != itemName) {
	    					return;
	    				}
	    				
	    				itemId = item.get("id");
	    				
	    				var itemCategory = new BCAPI.Models.WebApp.ItemCategory(webappName, itemId, {"items": expectedCategories});
	    				
	    				itemCategory.save({
	    					success: function() {
	    						categoriesAssigned = true;
	    					}
	    				});
	    			});
	    		}
	    	});
	    });
    	
    	waitsFor(function() {
    		return categoriesAssigned;
    	}, "Unable to assign categories to item " + itemName, MAX_TIMEOUT);
    }
    
    function _assertCorrectAssignment(itemName) {
    	var fetchedCategories = undefined;
    	
    	runs(function() {
    		var itemCategories = new BCAPI.Models.WebApp.ItemCategory(webappName, itemId);
    		
    		itemCategories.fetch({
	    		success: function(categories) {
	    			fetchedCategories = categories;
	    		}
    		});
    	});
    	
    	waitsFor(function() {
    		return fetchedCategories;
    	}, "Item " + itemName + " categories not fetched correctly.", MAX_TIMEOUT);
    	
    	runs(function() {
			var items = fetchedCategories.get("items"),
				idx = 0;    		
    		
			items.sort();
			expectedCategories.sort();
			
			expect(items.length).toBe(expectedCategories.length);
						
			_.each(items, function(category) {
				expect(category).toBe(expectedCategories[idx++]);
			});    		
    	});
    }
});