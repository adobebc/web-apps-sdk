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
	 * @param {String} genericToken Generic token we want to return from {@link BCAPI.Helper.Site.getGenericToken} 
	 * @param {String} siteToken Site token we want to return from {@link BCAPI.Helper.Site.getSiteToken}
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
	 * 		BCAPI.Mocks.Helper.Site("genericToken123", "siteToken12345", "https://simple.base.url.com/");
	 * 	});
	 * 
	 * 	it("Simple test case", function() {
	 * 		expect(BCAPI.Helper.Site.getGenericToken()).toBe(genericToken123);
	 * 		expect(BCAPI.Helper.Site.getSiteToken()).toBe(siteToken123);
	 * 		expect(BCAPI.Helper.Site.getRootUrl()).toBe("https://simple.base.url.com/");
	 * 	});
	 * });
	 */
	Mocks.Helper.Site= function(genericToken, siteToken, rootUrl) {
		spyOn(BCAPI.Helper.Site, "getGenericToken").andReturn(genericToken);
		spyOn(BCAPI.Helper.Site, "getSiteToken").andReturn(siteToken);
		spyOn(BCAPI.Helper.Site, "getRootUrl").andReturn(rootUrl);
	};
	
	/**
	 * This namespace holds useful test scenarios templates meant to ease unit tests creation.
	 * 
	 * @namespace BCAPI.Mocks.Tests
	 */
	Mocks.Tests = {};

	/**
	 * This function helps you write async unit tests in a sync manner.
	 * 
	 * @function
	 * @memberOf BCAPI.Mocks.Tests
	 * @param {function} runTest A function in which test logic is encapsulated.
	 * @param {function} doneCondition A function which returns true if the test logic was completely executed.
	 * @param {String} errMessage A friendly message displayed if test logic reached timeout logic.
	 * @param {function} timeout Optional timeout given in milliseconds for setting the maximum amount of time allocated for running the test. Default value is 50ms. 
	 * @example
	 * // sample test which relies on ajax requests.
	 * it("Sample test", function() {
	 *  var done = false;
	 * 
	 * 	function runTest() {
	 *  	function errorHandler(model, xhr, options) {
	 *  		expect(xhr).not.toBe(undefined);
	 *  
	 *          done = true;
	 *  	}
	 *  	
	 *  	spyOn($, "ajax").andCallFake(function(request) {
	 *  		request.error(expectedModel);
	 *  	});
	 *  }
	 *  
	 *  function doneCondition() {
	 *  	return done;
	 *  }
	 *  
	 *  BCAPI.Mocks.Helper.runAsyncUnitTest(runTest, doneCondition, "Error callback not invoked on time.");
	 * }
	 */
	Mocks.Tests.runAsyncUnitTest = function(runTest, doneCondition, errMessage, timeout) {
		timeout = timeout || 50;
		
		runs(runTest);
		
		waitsFor(doneCondition, errMessage, timeout);
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
	 * @memberOf BCAPI.Models
	 */
	Mocks.Models.PersonModel = BCAPI.Models.Model.extend({
		defaults: {
			firstName: "first_name_default",
			lastName: "last_name_default"
		},
		endpoint: function() {
			return "/api/v2/persons";
		}
	});
	
	BCAPI.Mocks = Mocks;
})();