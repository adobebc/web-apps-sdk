(function() {
	/**
	 * This namespace holds all available mock objects that are used in bcapi unit tests.
	 * 
	 * @namespace BCAPI.Mocks
	 */
	var Mocks = {};
	
	/**
	 * This namespace holds the utility methods for mocking {@link BCAPI.Helpers.Site} methods.
	 * @namespace BCAPI.Mocks.Site
	 */
	Mocks.Site = {};
	
	/**
	 * This method mocks {@link BCAPI.Helpers.Site} methods namespace to return given values.
	 * 
	 * @param {String} genericToken Generic token we want to return from {@link BCAPI.Helpers.Site.getGenericToken} 
	 * @param {String} siteToken Site token we want to return from {@link BCAPI.Helpers.Site.getSiteToken}
	 * @param {String} rootUrl Root url we want to return from {@link BCAPI.Helpers.Site.getRootUrl}
	 * @function
	 * @memberOf BCAPI.Mocks.Site
	 * 
	 * @example
	 * describe("Simple tests", function() {
	 *  var oldSiteHelper;
	 * 
	 * 	beforeEach(function() {
	 * 		oldSiteHelper = BCAPI.Helpers.Site;
	 * 		BCAPI.Mocks.site.mock("genericToken123", "siteToken12345", "https://simple.base.url.com/");
	 * 	});
	 * 
	 * 	it("Simple test case", function() {
	 * 		expect(BCAPI.Helpers.Site.getGenericToken()).toBe(genericToken123);
	 * 		expect(BCAPI.Helpers.Site.getSiteToken()).toBe(siteToken123);
	 * 		expect(BCAPI.Helpers.Site.getRootUrl()).toBe("https://simple.base.url.com/");
	 * 	});
	 * });
	 */
	Mocks.Site.mock = function(genericToken, siteToken, rootUrl) {
		spyOn(BCAPI.Helpers.Site, "getGenericToken").andReturn(genericToken);
		spyOn(BCAPI.Helpers.Site, "getSiteToken").andReturn(siteToken);
		spyOn(BCAPI.Helpers.Site, "getRootUrl").andReturn(rootUrl);
	};
	
	BCAPI.Mocks = Mocks;
})();