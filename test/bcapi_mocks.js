(function() {
	/**
	 * This namespace holds all available mock objects that are used in bcapi unit tests.
	 * 
	 * @namespace BCAPI.Mocks
	 */
	var Mocks = {};
	
	/**
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
	
	BCAPI.Mocks = Mocks;
})();