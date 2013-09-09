describe("Helper.Models.WebApp", function() {
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
    });

    it("Create, Read, Delete", function() {
        var webApp, saved = false;

        runs(function() {
            webApp = new BCAPI.Models.WebApp({name: "FirstWebAppFromApi"});
            webApp.save().done(function() { saved = true });
        });

        waitsFor(function() {
            return saved;
        }, 'Create WebApp', 500);

        var fetched = false;

        runs(function() {
            var webApp = new BCAPI.Models.WebApp({name: "FirstWebAppFromApi"});
            webApp.fetch().done(function() { fetched = true });
        });

        waitsFor(function() {
            return fetched;
        }, 'Read WebApp', 500);

        // TODO: Test webApp has correct attributes

        var deleted = false;

        runs(function() {
            var webApp = new BCAPI.Models.WebApp({name: "FirstWebAppFromApi"});
            webApp.destroy().done(function() { deleted = true });
        });

        waitsFor(function() {
            return deleted;
        }, 'Delete WebApp', 500);

        // TODO: Test webApp was deleted
    });

    afterEach(function() {
        var done = false;

        runs(function() {
            var webApp = new BCAPI.Models.WebApp({name: "FirstWebAppFromApi"});
            webApp.destroy().done(function() { done = true }).fail(function() { done = true });
        });

        waitsFor(function() {
            return done;
        }, 'Delete WebApp', 500);
    });
});
