/*
*
*Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

*Permission is hereby granted, free of charge, to any person obtaining a
*copy of this software and associated documentation files (the "Software"),
*to deal in the Software without restriction, including without limitation
*the rights to use, copy, modify, merge, publish, distribute, sublicense,
*and/or sell copies of the Software, and to permit persons to whom the
*Software is furnished to do so, subject to the following conditions:
*
*The above copyright notice and this permission notice shall be included in
*all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
*FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
*DEALINGS IN THE SOFTWARE.
*
*/
describe("BCAPI.Components.DataSources.JsonDataSource tests suite.", function() {
    beforeEach(function() {
        var self = this;

        jasmine.addMatchers(ComponentCustomMatchers);
        this._dataSource = document.createElement("bc-json");
        this._dataSource.url = "/test/url";

        this._contentHolder = document.createElement("div");
        document.body.appendChild(this._contentHolder);

        _mockJqueryAjax(self);
    });

    afterEach(function() {
        document.body.removeChild(this._contentHolder);
    });

    it("Ensures datasource can be dynamically created from js and list data.", function(done) {
        var jsonDataSource = document.createElement("bc-json"),
            jsonUrl = "/test/url/test.json";

        jsonDataSource.url = jsonUrl;

        _testListWorksOk(this, jsonDataSource, jsonUrl, done);
    });

    it("Ensures datasource can be used as standalone dom element and list data.", function(done) {
        var jsonUrl = "/test/url/test.json",
            elemHtml = "<bc-json id='jsonDataSource' url='" + jsonUrl + "'></bc-json>",
            self = this;

        this._contentHolder.innerHTML = elemHtml;

        ComponentTestHelpers.execWhenReady(function() {
            return document.getElementById("jsonDataSource");
        }, function(comp) {
            _testListWorksOk(self, comp, jsonUrl, done);
        }, undefined);
    });

    it("Ensures datasource can be nested within a parent node which supports datasources  and list data.", function(done) {
        this._contentHolder.supportsDataSource = true;

        var jsonUrl = "/test/url/test.json",
            elemHtml = "<bc-json id='jsonDataSource' url='" + jsonUrl + "'></bc-json>",
            self = this;

        this._contentHolder.innerHTML = elemHtml;

        ComponentTestHelpers.execWhenReady(function() {
            return document.getElementById("jsonDataSource");
        }, function(comp) {
            expect(self._contentHolder.dataSource).toBe(comp);

            _testListWorksOk(self, self._contentHolder.dataSource, jsonUrl, done);
        }, undefined);
    });

    it("Ensures fetch operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.fetch();
        }).toBeCustomError("BCAPI.Components.Exceptions.NotImplementedException");
    });

    it("Ensures create operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.create();
        }).toBeCustomError("BCAPI.Components.Exceptions.NotImplementedException");
    });

    it("Ensures update operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.update();
        }).toBeCustomError("BCAPI.Components.Exceptions.NotImplementedException");
    });

    it("Ensures delete operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.delete();
        }).toBeCustomError("BCAPI.Components.Exceptions.NotImplementedException");
    });

    it("Ensures json web components correctly returns true for isDataSource.", function(done) {
        expect(this._dataSource.isDataSource()).toBeTruthy();
    });

    /**
     * This function provides a template for ensuring list operation on json data sources works as expected.
     * @param {Object} ctx The object reference where transient data can be stored.
     * @param {BCAPI.Components.DataSources.JsonDataSource}   jsonDataSource The current json data source used by this test.
     * @param {String} jsonUrl The json url which we expect to be used by data source.
     * @param {Function} done Jasmine done callback which finishes an async test.
     * @return {undefined} No result.
     */
    function _testListWorksOk(ctx, jsonDataSource, jsonUrl, done) {
        var result = jsonDataSource.list(),
            expectedData = {"items": [{"id": 1, "text": "Works as expected."}]};

        expect(result).not.toBe(undefined);
        expect(typeof result.then).toBe("function");

        ctx._ajaxExpectedData = expectedData;

        result.then(function(data) {
            expect(ctx._lastOptions).not.toBe(undefined);
            expect(ctx._lastOptions.type).toBe("GET");
            expect(ctx._lastOptions.dataType).toBe("json");
            expect(ctx._lastOptions.url).toBe(jsonUrl);

            expect(data).not.toBe(undefined);
            expect(data).toBe(expectedData);

            done();
        });
    }

    /**
     * This method is used to mock jQuery ajax function. It stores received options to the given ctx. Moreover, it
     * returns the data from ctx._ajaxExpectedData as response to the request.
     *
     * @param  {Object} ctx The instance object which is going to be used to store all mocked information.
     * @return {undefined} No result.
     */
    function _mockJqueryAjax(ctx) {
        spyOn($, "ajax").and.callFake(function(lastOptions) {
            ctx._lastOptions = lastOptions;

            var result = $.Deferred();

            setTimeout(function() {
                result.resolve(ctx._ajaxExpectedData);
            });

            return result.promise();
        });
    }
});