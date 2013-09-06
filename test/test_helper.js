describe("Helper", function() {
    describe("Site", function() {

        it("tries to use JQuery.cookie to get tokens", function() {
            spyOn($, "cookie", true);

            BCAPI.Helper.Site.getGenericToken();
            expect($.cookie).toHaveBeenCalledWith('genericToken');

            BCAPI.Helper.Site.getSiteToken();
            expect($.cookie).toHaveBeenCalledWith('siteToken');
        });

        it("", function() {
            expect(BCAPI.Helper.Site.getRootUrl()).toBe("");
        });
	});
});
