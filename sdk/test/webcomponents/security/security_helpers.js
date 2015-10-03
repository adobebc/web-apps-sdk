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
                expect(actualEx.arg).toBe("securityCfg.site");
            });
    });

    it("Make sure an exception is raised if no access token is provided for configure.", function() {
        expect(function() {
            BCAPI.Security.configure({"site": "https://devs-next.com"});
        }).toBeCustomError("BCAPI.Components.Exceptions.BadArgumentException",
            function(actualEx) {
                expect(actualEx.arg).toBe("securityCfg.accessToken");
            });
    });

    it("Make sure configure works as expected.", function() {
        var securityCfg = {
            "site": "https://raducosnita-max2014.worldsecuresystems.com",
            "accessToken": "encrypted token"
        };

        BCAPI.Security.configure(securityCfg);

        expect(BCAPI.Security.securityCfg).toBe(securityCfg);
    });
});