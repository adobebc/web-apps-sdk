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
describe("Check category integration.", function() {
	var MAX_TIMEOUT = BCAPI.Config.MAX_TIMEOUT;
	
	beforeEach(function() {
	    BCAPI.Helper.Test.runTestServer();
	});
	
	it("Check category create / retrieve details.", function() {
		var categoryName = _generateUniqueName(),
			categoryAccess = true;
		
		_createCategory(categoryName, categoryAccess);
		_checkCategories(categoryName, categoryAccess);
	});
	
	function _createCategory(categoryName, categoryAccess) {
		var expectedCategory = new BCAPI.Models.Category({"name": categoryName,
			  											  "publicAccess": categoryAccess}),
			categoryCreated = undefined;;

		runs(function() {
			expectedCategory.save({
				success: function() {
					categoryCreated = true;
				}
			});
		});
		
		waitsFor(function() {
			return categoryCreated;
		}, "Category " + categoryName + " not created correctly.", MAX_TIMEOUT);
	};
	
	function _checkCategories(categoryName, categoryAccess) {
		var categoryCollection = new BCAPI.Models.CategoryCollection(),
			categoryFetched = false;
		
		runs(function() {
			categoryCollection.fetch({
				success: function(categories) {
					expect(categories.length).toBeGreaterThan(1);
					
					categories.each(function(category) {						
						if(category.get("name") != categoryName) {
							return;
						}
						
						
						_checkCategoryDetails(category.get("id"), categoryName, categoryAccess, function() {
							categoryFetched = true;
						});
					});
				}
			});
		});
		
		waitsFor(function() {
			return categoryFetched;
		}, "Category " + categoryName + " details not fetched correctly.", MAX_TIMEOUT);
	};
	
	function _checkCategoryDetails(categoryId, expectedName, expectedAccess, doneCallback) {
		var category = new BCAPI.Models.Category({"id": categoryId});
		
		category.fetch({
			success: function() {
				expect(category.get("name")).toBe(expectedName);
				expect(category.get("publicAccess")).toBe(expectedAccess);
									
				doneCallback();
			}
		});
	};
	
	function _generateUniqueName() {
		var uid = (new Date()).getTime(),
			categoryName = "Simple integration category " + uid;
		
		return categoryName;
	};
});
