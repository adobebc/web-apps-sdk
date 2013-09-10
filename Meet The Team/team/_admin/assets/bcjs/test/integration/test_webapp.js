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

        var sync = Backbone.sync;
        spyOn(Backbone, "sync").andCallFake(function(method, model, options) {

            // Prevent jQuery from failing on empty response
            options.dataType = null;
            options.contentType = 'application/json';

            return sync.apply(this, arguments);
        });
    });

    it("Create, List, Read, Delete", function() {
        var model,
            collection,
            saved = false,
            modelFetched = false,
            collectionFetched = false,
            deleted = false,
            notFound = false;

        runs(function() {
            model = new BCAPI.Models.WebApp.App({name: "FirstWebAppFromApi"});
            model.save().done(function() { saved = true });
        });

        waitsFor(function() {
            return saved;
        }, 'Create model', 60 * 1000);

        runs(function() {
            expect(model.get('id')).toBeUndefined();

            collection = new BCAPI.Models.WebApp.AppCollection();
            collection.fetch().done(function() { collectionFetched = true });
        });

        waitsFor(function() {
            return collectionFetched;
        }, 'List collection', 1000);

        runs(function() {
            console.log(collection);
            expect(collection.models.length).toBeGreaterThan(0);

            model.fetch().done(function() { modelFetched = true });
        });

        waitsFor(function() {
            return modelFetched;
        }, 'Read model', 1000);

        runs(function() {
            expect(model.get('id')).toBeDefined(); // check that attributes have been updated

            model.destroy().done(function() { deleted = true });
        });

        waitsFor(function() {
            return deleted;
        }, 'Delete model', 1000);

        runs(function() {
            model.fetch().fail(function() { notFound = true });
        });

        waitsFor(function() {
            return notFound;
        }, 'Model does not exist anymore', 1000);
    });

    afterEach(function() {

    });
});
