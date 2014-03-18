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
(function() {
	/**
	 * This namespace holds all available mock objects that are used in bcapi unit tests.
	 * 
	 * @namespace BCAPI.Mocks
	 */
	var Mocks = {};
	
	/**
	 * This namespace holds mock classes meant to replace BCAPI.Helper classes.
	 * 
	 * @namespace BCAPI.Mocks.Helper
	 */
	Mocks.Helper = {};
	
	/**
	 * This method mocks {@link BCAPI.Helper.Site} namespace.
	 * 
	 * @param {String} accessToken Site token we want to return from {@link BCAPI.Helper.Site.getAccessToken}
	 * @param {String} rootUrl Root url we want to return from {@link BCAPI.Helper.Site.getRootUrl}
	 * @function
	 * @memberOf BCAPI.Mocks.Helper
	 * 
	 * @example
	 * describe("Simple tests", function() {
	 *  var oldSiteHelper;
	 * 
	 * 	beforeEach(function() {
	 * 		oldSiteHelper = BCAPI.Helper.Site;
	 * 		BCAPI.Mocks.Helper.Site("siteToken12345", "https://simple.base.url.com/");
	 * 	});
	 * 
	 * 	it("Simple test case", function() {
	 * 		expect(BCAPI.Helper.Site.getAccessToken()).toBe(siteToken123);
	 * 		expect(BCAPI.Helper.Site.getRootUrl()).toBe("https://simple.base.url.com/");
	 * 	});
	 * });
	 */
	Mocks.Helper.Site = function(accessToken, rootUrl) {
		spyOn(BCAPI.Helper.Site, "getAccessToken").andReturn(accessToken);
		spyOn(BCAPI.Helper.Site, "getRootUrl").andReturn(rootUrl);
	};
	
	/**
	 * This namespace holds mock classes compatbible with BCAPI.Models specification.
	 * 
	 * @namespace BCAPI.Mocks.Models
	 */
	Mocks.Models = {};	
	
	/**
	 * This class provides a very simple mock model used in unit tests. It also provides
	 * a very good example of what is required to implement for adding a new model to sdk.
	 * 
	 * @name PersonModel
	 * @class
	 * @memberOf BCAPI.Mocks.Models
	 * @example
	 * var model = new BCAPI.Mocks.Models.PersonModel({
	 * 	firstName: "John",
	 * 	lastName: "Doe"
	 * });
	 */
	Mocks.Models.PersonModel = BCAPI.Models.Model.extend({
		defaults: {
			firstName: "first_name_default",
			lastName: "last_name_default"
		},
		endpoint: function() {
			return "api/v2/persons";
		},
		idAttribute: "idCustom"
	});
	
	/**
	 * This class provides a very simple mock collection used in unit tests. It also provides
	 * a very good example of what is required to implement for adding a new model collection for sdk.
	 * You can read {@link BCAPI.WebApp} for seeing how collections should work.
	 * 
	 * @name PersonCollection
	 * @class
	 * @memberOf BCAPI.Mocks.Models.PersonCollection
	 * @example
	 * var persons = new BCAPI.Mocks.Models.PersonCollection().fetch();
	 */
	Mocks.Models.PersonCollection = BCAPI.Models.Collection.extend({
		model: Mocks.Models.PersonModel
	});
	
	BCAPI.Mocks = Mocks;
})();
