/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

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
describe("Unit tests for category model.", function() {
	var apiUrl = "https://blog-app-1234-apps.worldsecuresystem.com";
	
	beforeEach(function() {
		spyOn(BCAPI.Helper.Site, "getRootUrl").andCallFake(function() {
			return apiUrl;
		});
	});
	
    it("Test collection edpoint is correct", function() {
        var categories = new BCAPI.Models.CategoryCollection();
        var expectedUrl = apiUrl + new BCAPI.Models.Category().endpoint();
        expect(categories.url().substring(0, expectedUrl.length)).toBe(expectedUrl);
        expect(categories.url()).toContain("limit=" + BCAPI.Config.Pagination.limit);
        expect(categories.url()).toContain("skip=" + BCAPI.Config.Pagination.skip);

    })
});
