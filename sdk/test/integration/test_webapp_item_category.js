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
describe("Check webapp item assign categories.", function() {
	var webappName = "WebAppItemsCategoryApp",
		appCreated = undefined,
		expectedCategories = undefined,
		itemId = undefined;

	var MAX_TIMEOUT = BCAPI.Config.MAX_TIMEOUT;
	
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
    		success: function() {
    			expectedCategories = [];
    			
    			categoryCollection.each(function(category) {
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
