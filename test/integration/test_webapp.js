describe("Helper.Models.WebApp", function() {
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();

        var done = false;

        // afterEach is not executed if the spec fails. So we have to clean-up data first
        runs(function() {
            var webApp = new BCAPI.Models.WebApp.App({name: "FirstWebAppFromApi"});
            webApp.destroy().always(function() { done = true });
        });

        waitsFor(function() {
            return done;
        }, 'Delete WebApp if it exists', 60 * 1000);
    });

    it("Create, Read, Delete", function() {
        var webApp,
            saved = false,
            fetched = false,
            deleted = false,
            notFound = false;

        runs(function() {
            webApp = new BCAPI.Models.WebApp.App({name: "FirstWebAppFromApi"});
            webApp.save().done(function() { saved = true });
        });

        waitsFor(function() {
            return saved;
        }, 'Create WebApp', 60 * 1000);

        runs(function() {
            expect(webApp.get('id')).toBeUndefined();

            webApp.fetch().done(function() { fetched = true });
        });

        waitsFor(function() {
            return fetched;
        }, 'Read WebApp', 1000);

        runs(function() {
            expect(webApp.get('id')).toBeDefined();

            webApp.destroy().done(function() { deleted = true });
        });

        waitsFor(function() {
            return deleted;
        }, 'Delete WebApp', 1000);

        runs(function() {
            webApp.isNotNew = true;
            webApp.fetch().fail(function() { notFound = true });
        });

        waitsFor(function() {
            return notFound;
        }, 'WebApp does not exist anymore', 1000);
    });

    afterEach(function() {

    });
});
