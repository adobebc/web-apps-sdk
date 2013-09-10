describe("BCAPI.Models.WebApp.App", function() {
    it('url()', function() {
        var webApp = new BCAPI.Models.WebApp.App({"name" : "SampleApp"});
        expect(webApp.url()).toBe(BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/sites/current/webapps');

        webApp.isNotNew = true;
        expect(webApp.url()).toBe(BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/sites/current/webapps/SampleApp');
    });
});