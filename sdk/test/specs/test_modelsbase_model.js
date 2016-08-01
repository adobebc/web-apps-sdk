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
describe("Unit tests for BC base model class.", function() {
	var oldSiteHelper = undefined,
		siteToken = "123",
		rootUrl = "https://secure.businesscatalyst.com",
		expectedUrl = rootUrl + "/api/v2/persons";
	
	beforeEach(function() {
		BCAPI.Mocks.Helper.Site(siteToken, rootUrl);
	});
	
	it("Check attributes default values.", function() {
		var model = new BCAPI.Mocks.Models.PersonModel();
		
        expect(model.get("firstName")).toBe("first_name_default");
		expect(model.get("lastName")).toBe("last_name_default");
	});
	
	it("Check attributes initialization through constructor.", function() {
		var model = new BCAPI.Mocks.Models.PersonModel({
			firstName: "John",
			lastName: "Doe"
		});
					
		expect(model.get("firstName")).toBe("John");
		expect(model.get("lastName")).toBe("Doe");			
	});
	
	it("Check default authorization site header", function() {
		var model = new BCAPI.Mocks.Models.PersonModel();
		
		var headers = model.headers();
		
		expect(headers.Authorization).toBe(siteToken);
	});		
	
	it("Check attributes initialization through set.", function() {
		var model = new BCAPI.Mocks.Models.PersonModel();
		
		model.set({
			firstName: "John",
			lastName: "Doe"
		});
					
		expect(model.get("firstName")).toBe("John");
		expect(model.get("lastName")).toBe("Doe");			
	});
	
	it("Check url built ok.", function() {
		var model = new BCAPI.Mocks.Models.PersonModel();
		
		expect(model.urlRoot()).toBe(expectedUrl);
	});
	
	it("Check error raised if no endpoint defined.", function() {
		var model = new BCAPI.Models.Model();
		
		expect(model.endpoint).toThrow();
	});
	
	/**
	 * This method is reused for ensuring correct ajax call is done for save operation.
	 */
	function _assertCorrectSaveCall(request, firstName, lastName, id) {
		var url = expectedUrl + (id ? "/" + id : ""),
			method = id ? "PUT" : "POST";
				
		expect(request.type).toBe(method);
		expect(request.url).toBe(url);
		expect(request.headers.Authorization).toBe(siteToken);
        expect(request.dataType).toBe("text");
        expect(request.contentType).toBe("application/json");

		var data = JSON.parse(request.data);
		expect(data.firstName).toBe(firstName);
		expect(data.lastName).toBe(lastName);
		
		expect(request.contentType).toBe("application/json");			
	}
	
	/**
	 * This function provides the template for testing model create / update operations.
	 */
	function _testSaveTemplate(isError, errMsg, modelId) {
		var model = new BCAPI.Mocks.Models.PersonModel({
			idCustom: modelId,
			firstName: "John",
			lastName: "Doe"
		});
		
		var callbackCalled = false;

		function successHandler(returnedModel, resp, options) {
			expect(returnedModel).toBe(model);
			expect(resp).not.toBe(undefined);
			expect(options.testKey).toBe(123);
			
			callbackCalled = true;
		}
		
		function errorHandler(returnedModel, xhr, options) {
			expect(returnedModel).toBe(model);
			expect(xhr).not.toBe(undefined);
			expect(options.testKey).toBe(123);
			
			callbackCalled = true;
		}		
		
		spyOn($, "ajax").andCallFake(function(request) {
			var xhrMock = $.Deferred();
			
			_assertCorrectSaveCall(request, "John", "Doe", modelId);
			
			if(isError) {
				request.error(model);
				
				return xhrMock;
			}
			
			request.success(model);
			
			return xhrMock;
		});
					
		runs(function() {
			var options = {testKey: 123};
			
			if(isError) {
				options.error = errorHandler;
			} else {
				options.success = successHandler;
			}
			
			model.save(options);
		});
		
		waitsFor(function() {
			return callbackCalled;
			
		}, errMsg, 50);		
	}
	
	it("Check save operation ok.", function() {
		_testSaveTemplate(false, "Model save success handler not invoked.");		
	});
	
	it("Check save operation error execute error handler.", function() {
	    _testSaveTemplate(true, "Model save error handler not invoked.");
	});
		
	it("Check model update operation ok.", function() {
		_testSaveTemplate(false, "Model update success handler not invoked.", 101);		
	});

	it("Check model update operation error handler invoked.", function() {
		_testSaveTemplate(true, "Model update success handler not invoked.", 101);		
	});
	
	it("Check save operation without params - it used to crash in the past.", function() {
		var model = new BCAPI.Mocks.Models.PersonModel({
						idCustom: 101,
						firstName: "John",
						lastName: "Doe"}),
			ajaxCalled = false;
		
		spyOn($, "ajax").andCallFake(function(request) {
			_assertCorrectSaveCall(request, "John", "Doe", 101);
			
			ajaxCalled = true;
			
			return $.Deferred();
		});
		
		runs(function() {
			model.save();
		});
		
		waitsFor(function() {
			return ajaxCalled;
		}, "No ajax call done when saving without parameters.", 50);
	});
	
	/**
	 * This method makes sure request for model destroy sends correct data to server.
	 */
	function _assertCorrectDeleteCall(request, id) {
		expect(request.dataType).toBe("text");
		expect(request.type).toBe("DELETE");
		expect(request.url).toBe(expectedUrl + "/" + id);
		expect(request.headers.Authorization).toBe(siteToken);			
	}
	
	it("Check destroy operation executes ok.", function() {
		var expectedModel = new BCAPI.Mocks.Models.PersonModel({idCustom: 1});
		
		var callbackCalled = false;
		
		function successHandler(model, response) {
			expect(model).toBe(expectedModel);
			expect(response).not.toBe(undefined);
			
			callbackCalled = true;
		};
		
		spyOn($, "ajax").andCallFake(function(request) {
			_assertCorrectDeleteCall(request, 1);
			
			request.success(expectedModel);
			
			return $.Deferred();
		});
		
		runs(function() {
			expectedModel.destroy({success: successHandler});
		});
		
		waitsFor(function() {
			return callbackCalled;
		});
	});
	
	it("Check destroy error handler invoked.", function() {
		var expectedModel = new BCAPI.Mocks.Models.PersonModel({idCustom: 1});
		
		var callbackCalled = false;
		
		function errorHandler(model, xhr, options) {
			expect(model).toBe(expectedModel);
			expect(xhr).not.toBe(undefined);
			expect(options.testKey).toBe(123);
			
			callbackCalled = true;
		};
		
		spyOn($, "ajax").andCallFake(function(request) {
			_assertCorrectDeleteCall(request, 1);
			
			request.error(expectedModel);
			
			return $.Deferred();
		});
		
		runs(function() {
			expectedModel.destroy({error: errorHandler, testKey: 123});
		});
		
		waitsFor(function() {
			return callbackCalled;
		});			
	});
});
