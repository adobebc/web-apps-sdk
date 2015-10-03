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
describe("BCAPI.Security helper method tests suite.", function() {
    beforeEach(function() {
        jasmine.addMatchers(ComponentCustomMatchers);
    });

    afterEach(function() {
        BCAPI.Security.securityCfg = undefined;
        BCAPI.Security._bcSecurityCtx = undefined;
    });

    it("Make sure an exception is raised if no configuration is given as parameter.", function() {
        expect(function() {
            BCAPI.Security.configure();
        }).toBeCustomError("BCAPI.Components.Exceptions.BadArgumentException",
            function(actualEx) {
                expect(actualEx.arg).toBe("securityCfg");
            });

        expect(function() {
            BCAPI.Security.configure({});
        }).toBeCustomError("BCAPI.Components.Exceptions.BadArgumentException",
            function(actualEx) {
                expect(actualEx.arg).toBe("securityCfg");
            });
    });

    it("Make sure an exception is raised if no site is provided in security cfg argument.", function() {
        expect(function() {
            BCAPI.Security.configure({"a": "b"});
        }).toBeCustomError("BCAPI.Components.Exceptions.BadArgumentException",
            function(actualEx) {
                expect(actualEx.arg).toBe("securityCfg.siteUrl");
            });
    });

    it("Make sure an exception is raised if no access token is provided for configure.", function() {
        expect(function() {
            BCAPI.Security.configure({"siteUrl": "https://devs-next.com"});
        }).toBeCustomError("BCAPI.Components.Exceptions.BadArgumentException",
            function(actualEx) {
                expect(actualEx.arg).toBe("securityCfg.accessToken");
            });
    });

    it("Make sure configure works as expected.", function() {
        var securityCfg = {
            "siteUrl": "https://testsite.com",
            "accessToken": "encrypted token"
        };

        BCAPI.Security.configure(securityCfg);

        expect(BCAPI.Security.securityCfg).toBe(securityCfg);
    });

    it("Make sure bc security context can be obtained with securityCfg configured.", function(done) {
        var securityCfg = {
                "siteUrl": "https://testsite.com",
                "accessToken": "encrypted token value"
            },
            userData = {
                "id": 123,
                "firstName": "John",
                "lastName": "Doe"
            },
            meDataSource = {
                "configureInvoked": false,
                "listInvoked": false,
                "list": function() {
                    this.listInvoked = true;
                    var response = $.Deferred();

                    setTimeout(function() {
                        response.resolve(userData);
                    });

                    return response.promise();
                },
                "configure": function(opts) {
                    this.configureInvoked = true;
                    expect(opts.apiName).toBe("users");
                    expect(opts.apiVersion).toBe("v3");
                    expect(opts.resourceId).toBe("me");
                    expect(opts.fields).toBe("id,firstName,lastName");
                }
            };

        BCAPI.Security.configure(securityCfg);

        spyOn(document, "createElement").and.callFake(function(elemName) {
            if (elemName === "bc-api") {
                return meDataSource;
            }

            throw new Exception("Unexpected element name: " + elemName);
        });

        BCAPI.Security.getBcSecurity().then(function(bcCtx) {
            expect(meDataSource.listInvoked).toBeTruthy();
            expect(meDataSource.configureInvoked).toBeTruthy();

            expect(bcCtx).not.toBe(undefined);

            expect(bcCtx.accessToken).not.toBe(undefined);
            expect(bcCtx.user).not.toBe(undefined);

            expect(bcCtx.accessToken.userId).toBe(userData.id);
            expect(bcCtx.accessToken.token).toBe(securityCfg.accessToken);
            expect(bcCtx.accessToken.scopes.length).toBe(0);

            expect(bcCtx.accessToken.user.id).toBe(userData.userId);
            expect(bcCtx.accessToken.user.firstName).toBe(userData.firstName);
            expect(bcCtx.accessToken.user.lastName).toBe(userData.lastName);

            expect(bcCtx.user.id).toBe(userData.userId);
            expect(bcCtx.user.firstName).toBe(userData.firstName);
            expect(bcCtx.user.lastName).toBe(userData.lastName);

            expect(BCAPI.Security._bcSecurityCtx).toBe(bcCtx);

            done();
        });
    });

    it("Make sure subsequent calls to getBcSecurity return a cached version.", function(done) {
        var securityCtx = new BCAPI.Security.BcSecurityContext();

        BCAPI.Security._bcSecurityCtx = securityCtx;

        BCAPI.Security.getBcSecurity().then(function(newSecurityCtx) {
            expect(newSecurityCtx).toBe(securityCtx);

            done();
        });
    });
});