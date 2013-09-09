describe("Helper.Models.WebApp", function() {
        it("CRUD", function() {

            BCAPI.Helper.Test.useTestServer();

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

            var deleted = false;

            runs(function() {
                var webApp = new BCAPI.Models.WebApp({name: "FirstWebAppFromApi"});
                webApp.destroy().done(function() { deleted = true });
            });

            waitsFor(function() {
                return deleted;
            }, 'Read WebApp', 500);
        });
});
