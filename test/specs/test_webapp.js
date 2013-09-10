describe("BCAPI.Models.WebApp.App", function() {
    var webApp,
        rootUrl = '',
        siteToken = 'none',
        collectionUrl = rootUrl + '/api/v2/admin/sites/current/webapps',
        itemUrl = collectionUrl + '/SampleApp';

    beforeEach(function() {
        BCAPI.Mocks.Helper.Site(null, siteToken, rootUrl);

        webApp = new BCAPI.Models.WebApp.App({"name" : "SampleApp"});
    });

    it('url()', function() {
        expect(webApp.url()).toBe(collectionUrl);

        webApp.isNotNew = true;
        expect(webApp.url()).toBe(itemUrl);
    });

    it('uses correct urls in fetch, even if id attribute is not set', function() {
        spyOn($ ,"ajax").andCallFake(function(options) {
            expect(options.url).toBe(itemUrl);
        });

        webApp.fetch();
    });

    it('uses correct urls in destroy, even if id attribute is not set', function() {
        spyOn($ ,"ajax").andCallFake(function(options) {
            expect(options.url).toBe(itemUrl);
        });

        webApp.destroy();
    });
});