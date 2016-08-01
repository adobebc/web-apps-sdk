/* 
* 
* Copyright © 2016 Adobe. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
describe("Helper.Models.WebApp", function() {
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();

        var done = false;

        // afterEach is not executed if the spec fails. So we have to clean-up data first
        runs(function() {
            var webApp = new BCAPI.Models.WebApp.App({name: "FirstWebAppFromApi"});
            webApp.destroy().always(function() { done = true; });
        });

        waitsFor(function() {
            return done;
        }, 'Delete WebApp if it exists', 60 * 1000);

        var sync = Backbone.sync;
        spyOn(Backbone, "sync").andCallFake(function(method, model, options) {

            // Prevent jQuery from failing on empty response
            // Cannot use "text", as it will not parse JSON even when needed
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
            model.save().done(function() { saved = true; });
        });

        waitsFor(function() {
            return saved;
        }, 'Create model', 60 * 1000);

        runs(function() {
            expect(model.get('id')).toBeUndefined();

            collection = new BCAPI.Models.WebApp.AppCollection();
            collection.fetch().done(function() {
            	var appFound = false;
            	
            	expect(collection.each).toBeDefined();
            	
            	collection.each(function(app) {
            		if(app.get("name") == "FirstWebAppFromApi") {
            			appFound = true;
            		}
            	});
            	
            	expect(appFound).toBeTruthy();            	
            	
            	collectionFetched = true            	
            });
        });

        waitsFor(function() {
            return collectionFetched;
        }, 'List collection', 1000);

        runs(function() {
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
