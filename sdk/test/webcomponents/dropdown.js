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
describe("BCAPI.Components.DropDown tests suite.", function() {
    beforeEach(function() {
        this._contentHolder = document.createElement("div");
        this._dropDownId = "ddOrderBy";
        this._dropDown = document.createElement("bc-select");
        this._dropDown.setAttribute("id", this._dropDownId);

        this._contentHolder.appendChild(this._dropDown);

        document.body.appendChild(this._contentHolder);
    });

    afterEach(function() {
        document.body.removeChild(this._contentHolder);
    });

    it("Ensures configure works as expected for dynamically created dropdown.", function(done) {
        var self = this;

        ComponentTestHelpers.execWhenReady(function() {
            var dropDown = document.getElementsByTagName("bc-select");

            return dropDown[0];
        }, function(comp) {
            var items = [
                {"value": "0", "text": "Order by"},
                {"value": "id", "text": "Customer id"}
            ];

            comp.configure({"items": items});

            var options = comp.querySelectorAll("option");

            expect(options).not.toBe(undefined);
            expect(options.length).toBe(items.length);

            for (var idx = 0; idx < options.length; idx++) {
                expect(options[idx].value).toBe(items[idx].value);
                expect(options[idx].text).toBe(items[idx].text);
            }
        }, done);
    });

    it("Ensures style property is bindable for dropdown.", function(done) {
        var self = this;

        ComponentTestHelpers.execWhenReady(function() {
            return self._dropDown;
        }, function(comp) {
            var innerSelect = comp.querySelector("select"),
                newClasses = "class1 class2";

            expect(innerSelect).not.toBe(undefined);
            expect(innerSelect.hasAttribute("class")).toBeTruthy();

            expect(innerSelect.classList.length).toBe(1);
            expect(innerSelect.classList[0]).toBe("form-control");

            comp.class = newClasses;

            var expectedClassList = newClasses.split(" ");

            for (var idx = 0; idx < expectedClassList.length; idx++) {
                expect(innerSelect.classList[idx]).toBe(expectedClassList[idx]);
            }
        }, done);
    });
});