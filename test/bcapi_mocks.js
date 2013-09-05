(function() {
	/**
	 * @namespace BCAPI.Mocks
	 */
	var Mocks = {};
	
	/**
	 * @namespace BCAPI.Mocks.Site
	 */
	Mocks.Site = {};
	
	Mocks.Site.mock = function(genericToken, siteToken, rootUrl) {
		spyOn(BCAPI.Helpers.Site, "getGenericToken").andReturn(genericToken);
		spyOn(BCAPI.Helpers.Site, "getSiteToken").andReturn(siteToken);
		spyOn(BCAPI.Helpers.Site, "getRootUrl").andReturn(rootUrl);
	};
	
	BCAPI.Mocks = Mocks;
})();