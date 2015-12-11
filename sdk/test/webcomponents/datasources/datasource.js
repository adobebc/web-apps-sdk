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
describe("BCAPI.Components.DataSources.DataSource test suite.", function() {
    beforeEach(function() {
        jasmine.addMatchers(ComponentCustomMatchers);

        this._dataSource = new BCAPI.Components.DataSources.DataSource();
    });

    afterEach(function() {
        this._dataSource = undefined;
    });

    it("Ensures fetch operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.fetch();
        }).toBeCustomError("BCAPI.Components.Exceptions.NotImplementedException");
    });

    it("Ensures list operation is not implemented.", function() {
        var self = this;

        expect(function() {
            self._dataSource.list();
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
});