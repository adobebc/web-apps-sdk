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
describe("BCAPI.Components.DataSources.ApiDataSource", function() {
    beforeEach(function() {
        this._compHolder = document.createElement("div");

        this._apiDataSource = document.createElement("bc-api");
        this._dropDown = document.createElement("bc-select");

        document.body.appendChild(this._compHolder);
    });

    afterEach(function() {
        try {
            document.body.removeChild(this._compHolder);
        } catch (err) {
            console.log("Unable to remove api data source from dom ... probably not added");
        }
    });

    it("Ensures api data source is correctly transformed to a web component.", function(done) {
        this._compHolder.appendChild(this._apiDataSource);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-api");
        }, function(comp) {
            expect(comp).not.toBe(undefined);
            comp.id = "bcApiDataSource";

            var domSelectedDs = document.getElementById("bcApiDataSource");
            expect(domSelectedDs).toBe(comp);
        }, done);
    });

    it("Ensures api data source is correctly wired to a parent web component which supports data sources.", function(done) {
        var self = this;
        
        this._compHolder.appendChild(this._dropDown);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-select");
        }, function(ddComp) {
            ddComp.appendChild(self._apiDataSource);

            ComponentTestHelpers.execWhenReady(function() {
                return document.querySelector("bc-api");
            }, function(comp) {
                expect(comp).not.toBe(undefined);
                expect(self._dropDown.dataSource).toBe(comp);
            }, done);
        });
    });

    it("Ensures configure method works as expected for an existing api data source.", function(done) {
        this._compHolder.appendChild(this._apiDataSource);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-api");
        }, function(comp) {
            expect(comp.apiName).toBe(undefined);
            expect(comp.apiVersion).toBe(undefined);
            expect(comp.fields).toBe(undefined);
            expect(comp.where).toBe(undefined);
            expect(comp.resourceId).toBe(undefined);

            comp.configure({apiName: "simple-api"});
            expect(comp.apiName).toBe("simple-api");
            expect(comp.apiVersion).toBe(undefined);
            expect(comp.fields).toBe(undefined);
            expect(comp.where).toBe(undefined);
            expect(comp.resourceId).toBe(undefined);

            comp.configure({apiVersion: "v2"});
            expect(comp.apiName).toBe("simple-api");
            expect(comp.apiVersion).toBe("v2");
            expect(comp.fields).toBe(undefined);
            expect(comp.where).toBe(undefined);
            expect(comp.resourceId).toBe(undefined);

            comp.configure({fields: "a,b"});
            expect(comp.apiName).toBe("simple-api");
            expect(comp.apiVersion).toBe("v2");
            expect(comp.fields).toBe("a,b");
            expect(comp.where).toBe(undefined);
            expect(comp.resourceId).toBe(undefined);

            comp.configure({where: '{"a": "b"}'});
            expect(comp.apiName).toBe("simple-api");
            expect(comp.apiVersion).toBe("v2");
            expect(comp.fields).toBe("a,b");
            expect(typeof comp.where).toBe("object");
            expect(comp.where.a).toBe("b");
            expect(comp.resourceId).toBe(undefined);

            comp.configure({resourceId: "50"});
            expect(comp.apiName).toBe("simple-api");
            expect(comp.apiVersion).toBe("v2");
            expect(comp.fields).toBe("a,b");
            expect(typeof comp.where).toBe("object");
            expect(comp.where.a).toBe("b");
            expect(comp.resourceId).toBe("50");

            comp.configure({
                "apiName": "simple-api-changed",
                "apiVersion": "v3",
                "fields": "a,b,c",
                "where": {c: "d"},
                "resourceId": "xyz"
            });
            expect(comp.apiName).toBe("simple-api-changed");
            expect(comp.apiVersion).toBe("v3");
            expect(comp.fields).toBe("a,b,c");
            expect(typeof comp.where).toBe("object");
            expect(comp.where.c).toBe("d");
            expect(comp.resourceId).toBe("xyz");
        }, done);
    });

    it("Ensures bc api datasource list operation without parameters works as expected.", function(done) {
        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        _testDataSourceList(this, undefined, this._ajaxExpectedData, done);
    });

    it("Ensures bc api datasource list operation correctly applies post-fetch listeners.", function(done) {
        var expectedData = "test object",
            self = this;

        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        window.transformCustomers = function(ctx) {
            expect(ctx.result).toBe(self._ajaxExpectedData);
            ctx.result = expectedData;
        };
        
        _testDataSourceList(this, undefined, expectedData, done,
            function(comp) {
                comp.wireEvents({
                    "post-fetch": window.transformCustomers
                });
            },
            function() {
                window.transformCustomers = undefined;
            });
    });

    it("Ensures bc api datasource list operation for individual resourceId works as expected.", function(done) {
        this._ajaxExpectedData = {"firstName": "John", "lastName": "Doe"};

        _testDataSourceList(this, {"resourceId": "1"}, this._ajaxExpectedData, done);
    });

    it("Ensures bc api datasource list operation for a given where clause works as expected.", function(done) {
        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        _testDataSourceList(this, {
            "where": {"a": "b"}
        }, this._ajaxExpectedData, done);
    });

    it("Ensures bc api datasource list operation for a given fields setting works as expected.", function(done) {
        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        _testDataSourceList(this, {
            fields: "a,b"
        }, this._ajaxExpectedData, done);
    });

    it("Ensures bc api datasource list operation opts parameters override configured data source parameter.", function(done) {
        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        _testDataSourceList(this, {
            where: {"a": "b"},
            fields: "a,b",
            resourceId: "123"
        }, this._ajaxExpectedData, done, function(comp) {
            comp.configure({
                where: {"xx": "yy"},
                fields: "z,zz",
                resourceId: "-999888"
            });
        });
    });

    it("Ensures bc api datasource list operation works with configured ds attributes when no opts is given.", function(done) {
        this._ajaxExpectedData = {
            "totalItemsCount": 1,
            "skip": 0,
            "limit": 10,
            "items": [
                {"firstName": "John", "lastName": "Doe"}
            ]
        };

        _testDataSourceList(this, undefined, this._ajaxExpectedData, done, function(comp) {
            comp.configure({
                where: {"xx": "yy"},
                fields: "z,zz",
                resourceId: "-999888"
            });
        });
    });

    /**
     * This method provides a template for testing datasource list method.
     *
     * @private
     * @method
     * @param {Object} ctx This argument defines the context which is used internally by the method.
     * @param {Object} opts This argument defines the options which must be passed to the list method.
     * @param {Object} expectedData The data we expect to receive at the end of test execution.
     * @param {function} done Async method used to signal end of test case execution.
     * @param {function} configWhenReady (optional) A method invoked immediately after data source component is ready.
     * @param {function} cleanup (optional) A method invoked in order to cleanup the test.
     * @returns {undefined}
     */
    function _testDataSourceList(ctx, opts, expectedData, done, configWhenReady, cleanup) {
        opts = opts || {};
        var resourceId = opts.resourceId,
            where = opts.where,
            fields = opts.fields;

        ComponentTestHelpers.mockJqueryAjax(ctx);

        ctx._compHolder.appendChild(ctx._apiDataSource);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-api");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            (configWhenReady || function() { })(comp);

            comp.configure({
                "apiName": "customers",
                "apiVersion": "v3"
            });

            var response = comp.list(opts);

            response.then(function(data) {
                expect(data).toBe(expectedData);

                expect(ctx._lastOptions.url).not.toBe(undefined);

                var url = new URL(ctx._lastOptions.url);
                expect(url.pathname).toBe("/webresources/api/v3/sites/current/customers" + (resourceId ? "/" + resourceId : ""));

                var apiOptions = BCAPI.Helper.Http.getDecodedParameters(ctx._lastOptions.data);
                var expectedWhere = undefined;

                if (comp.where) {
                    expectedWhere = JSON.stringify(comp.where);
                }

                if (where) {
                    expectedWhere = JSON.stringify(where);
                }

                expect(apiOptions.fields).toBe(!fields ? comp.fields : fields);
                expect(apiOptions.where).toBe(expectedWhere);
                expect(apiOptions.resourceId).toBe(undefined);

                (cleanup || function() { })();

                done();
            });
        });
    }
});