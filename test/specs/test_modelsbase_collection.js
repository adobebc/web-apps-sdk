/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

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
describe("Unit tests for BC base collection class.", function() {
	var oldSiteHelper = undefined,
		siteToken = "123",
		rootUrl = "https://secure.businesscatalyst.com/";

	beforeEach(function() {
		oldSiteHelper = BCAPI.Helper.Site;		
		
		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
	});
	
	afterEach(function() {
		expect(oldSiteHelper).not.toBe(undefined);
		
		BCAPI.Helper.Site = oldSiteHelper;
	});
	
	it("Check correct collection instantiation.", function() {		
		var collection = new BCAPI.Mocks.Models.PersonCollection();
		
		expect(collection.model).toBe(BCAPI.Mocks.Models.PersonModel);
		expect(collection._defaultLimit).toBe(BCAPI.Config.Pagination.limit);
		expect(collection._defaultSkip).toBe(BCAPI.Config.Pagination.skip);
	});
	
	it("Check correct collection url.", function() {
		var person = new BCAPI.Mocks.Models.PersonModel();
		var collection = new BCAPI.Mocks.Models.PersonCollection(),
			personUrl = person.urlRoot();
				
		expect(collection.url().substring(0, personUrl.length)).toBe(personUrl);
	});
	
	/**
	 * This method provides a test template for collection fetch.
	 * 
	 * @params {List} expectedItems A list of items containing person data.
	 * @param {Object} options Options required for filtering, ordering, pagination.
	 * @param {Integer} numQueryParams The total number of query params we expect api url to have.
	 * @param {Integer} options.skip The number of records we want to skip from data set.
	 * @param {Integer} options.limit The total number of records we want to include in data set.
	 * @param {Object} options.where An object describing a filtering criteria passed to API.
	 * @param {String} options.order The order expression used.
	 * @param {function} options.error The error handler we want to invoke.
	 */
	function _testCollectionFetchWithParams(expectedItems, numQueryParams, options) {		
		options = options || {};
		
		var personModel = new BCAPI.Mocks.Models.PersonModel(),
			collection = new BCAPI.Mocks.Models.PersonCollection(), 
			callbackCalled = false,
			errorHandler = options.error,
			waitMsg = !errorHandler ? "Success callback not called." : "Error callback not called."; 		
		
		if(errorHandler) {
			options.error = function(model, xhr, options) {
				errorHandler(model, xhr, options);
				
				callbackCalled = true;
			};
		}
		
		function successHandler(returnedCollection, response, options) {
			var idx = 0;
			
			returnedCollection.each(function(item) {
				var expectedItem = expectedItems[idx++];
				
				expect(item.get("firstName")).toBe(expectedItem.firstName);
				expect(item.get("lastName")).toBe(expectedItem.lastName);
			});
			
			callbackCalled = true;
		}
		
		spyOn($, "ajax").andCallFake(function(request) {
			var urlRoot = personModel.urlRoot(),
				expectedLimit = options.limit || BCAPI.Config.Pagination.limit,
				expectedSkip = options.skip || BCAPI.Config.Pagination.skip,
				expectedWhere = options.where,
				expectedOrder = options.order,
				totalAnd = request.url.split("&").length;
			
			console.log(request.url);
			
			expect(request.url.substring(0, urlRoot.length + 1)).toBe(urlRoot + "?");
			expect(request.url).toContain("limit=" + expectedLimit);
			expect(request.url).toContain("skip=" + expectedSkip);
			
			if(expectedWhere) {
				expect(request.url).toContain("where=" + JSON.stringify(expectedWhere));
			} else {
				expect(request.url).not.toContain("where=");
			}
			
			if(expectedOrder) {
				expect(request.url).toContain("order=" + expectedOrder);
			} else {
				expect(request.url).not.toContain("order=");
			}
			
			expect(totalAnd).toBe(numQueryParams);			
			expect(request.type).toBe("GET");
			expect(request.dataType).toBe("json");
			expect(request.headers.Authorization).toBe(siteToken);
			
			if(!errorHandler) {
				request.success({"items": expectedItems});
			} else {
				request.error(errorHandler);
			}
		});
		
		runs(function() {
			var fetchArgs = {success: successHandler};

			for(var key in options) {
				fetchArgs[key] = options[key];
			}
			
			collection.fetch(fetchArgs);
		});
		
		waitsFor(function() {
			return callbackCalled;
		}, waitMsg, 50);		
	}
	
	it("Check correct collection fetch with default values..", function() {
		var expectedItems = [{"firstName": "John",
			  				  "lastName": "Doe"},
			  				 {"firstName": "Triple",
			  			      "lastName": "X"}];
		
		_testCollectionFetchWithParams(expectedItems, 2);
	});
	
	it("Check correct collection fetch pagination.", function() {
		var expectedItems = [{"firstName": "John",
							  "lastName": "Doe"}],
			options = {skip: 10, limit: 1};
							  
		_testCollectionFetchWithParams(expectedItems, 2, options);
	});
	
	it("Check correct collection fetch ordering.", function() {
		var expectedItems = [{"firstName": "Triple", "lastName": "X"},
		                     {"firstName": "John", "lastName": "Doe"}],
		    options = {"order": "-lastName"};
		
		_testCollectionFetchWithParams(expectedItems, 3, options);
	});
	
	it("Check correct collection fetch where.", function() {
		var expectedItems = [{"firstName": "John", "lastName": "Doe"}],
		    where = {"firstName": "John",
					 "lastName": {"$contains": "Doe"}};
		
		_testCollectionFetchWithParams(expectedItems, 3, {"where": where});
	});
	
	it("Check correct collection fetch with pagination, filtering and sorting specified.", function() {
		var expectedItems = [{"firstName": "John", "lastName": "Doe"},
		                     {"firstName": "Joan", "lastName": "Doe"}],
		    options = {skip: 2, 
					   limit: 5, 
					   order: "firstName",
					   where: {"firstName": {"$beginsWith": "Jo"},
						   	   "lastName": "Doe"}};
		
		_testCollectionFetchWithParams(expectedItems, 4, options);
	});
	
	it("Check correct collection fetch error handling.", function() {
		function errorHandler(collection, xhr, options) {
			expect(collection).not.toBe(undefined);
			expect(collection._defaultLimit).toBe(BCAPI.Config.Pagination.limit);
			expect(collection._defaultSkip).toBe(BCAPI.Config.Pagination.skip);
			
			expect(xhr).not.toBe(undefined);
			expect(options).not.toBe(undefined);
			expect(options.testKey).toBe("1234");
		}
		
		var options = {error: errorHandler,
					   testKey: "1234"};
		
		_testCollectionFetchWithParams(undefined, 2, options);
	});
});
