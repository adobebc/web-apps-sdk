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
        try {
            document.body.removeChild(this._contentHolder);
        } catch (err) {
            console.log("Unable to remove dropdown component ... Probably removed before cleanup phase.");
        }
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

    it("Ensures setValue correctly triggers changed event.", function(done) {
        var self = this;

        ComponentTestHelpers.execWhenReady(function() {
            return self._dropDown;
        }, function(comp) {
            var items = [{"value": "0", "text": "Order by"},
                {"value": "id", "text": "Customer Id"},
                {"value": "firstName", "text": "Order by"},
                {"value": "middleName", "text": "Middle name"},
                {"value": "lastName", "text": "Last name"},
                {"value": "homePhone", "text": "Phone number"}],
                innerSelect = self._dropDown.querySelector("select"),
                selectedItem = undefined;

            comp.configure({"items": items});

            selectedItem = comp.getValue();

            expect(selectedItem).toBe(items[0]);

            comp.on("changed", function(item) {
                selectedItem = item;
            });

            expect(comp.setValue("middleName")).toBeTruthy();

            expect(selectedItem).toBe(items[3]);
        }, done);
    });

    it("Ensures setValue fails if the given value does not belong to any item.", function(done) {
        var self = this;

        ComponentTestHelpers.execWhenReady(function() {
            return self._dropDown;
        }, function(comp) {
            var items = [
                {"value": "Works", "text": "ok"}
            ];

            expect(comp.getValue()).toBe(undefined);
            expect(comp.setValue(undefined)).toBeFalsy();

            comp.configure({"items": items});

            expect(comp.setValue("new value")).toBeFalsy();

            expect(comp.getValue()).toBe(items[0]);
        }, done);
    });

    it("Ensures dropdown can be configured from html markup.", function(done) {
        var markup = "<bc-select id='ddConfiguredFromMarkup'><option value='0'>0</option><option value='2' selected>Cool text</option></bc-select>",
            self = this;

        this._contentHolder.innerHTML = markup;

        ComponentTestHelpers.execWhenReady(function() {
            return document.getElementById("ddConfiguredFromMarkup");
        }, function(comp) {
            var selectedItem = comp.getValue();

            expect(comp.items).not.toBe(undefined);
            expect(comp.items.length).toBe(2);

            expect(selectedItem).not.toBe(undefined);

            expect(selectedItem.value).toBe("2");
            expect(selectedItem.text).toBe("Cool text");

            expect(comp.setValue("0")).toBeTruthy();
            selectedItem = comp.getValue();

            expect(selectedItem.value).toBe("0");
            expect(selectedItem.text).toBe("0");
        }, done);
    });

    it("Ensures dropdown can be populated from dynamic datasource.", function(done) {
        var self = this,
            data = {"items": [{"id": 1, "name": "test"}, {"id": 2, "name": "test 2"}]},
            dataSource = {
                list: function() {
                    var response = $.Deferred();

                    setTimeout(function() {
                        response.resolve(data);
                    });

                    return response.promise();
                }
            };

        ComponentTestHelpers.execWhenReady(function() {
            return self._dropDown;
        }, function(comp) {
            expect(comp.items).toBe(undefined);

            comp.setAttribute("value-prop", "id");
            comp.setAttribute("text-prop", "name");
            comp.configure({"dataSource": dataSource});

            comp.on("dataLoaded", function() {
                expect(comp.items).not.toBe(undefined);
                expect(comp.items.length).toBe(data.items.length);

                for (idx = 0; idx < data.items.length; idx++) {
                    comp.items[idx].value = data.items[idx].id;
                    comp.items[idx].text = data.items[idx].name;
                }

                done();
            });
        }, undefined);
    });

    it("Ensures dropdown can be populated from html bc datasources.", function(done) {
        var data = {"items": [
                {"id": 1, "name": "John"},
                {"id": 2, "name": "Doe"}]},
            markup = "<bc-select id='ddTest' value-prop='id' text-prop='name'><bc-json url='/test/url' rel='datasource'></bc-json></bc-select>";

        this._ajaxExpectedData = data;
        _mockJqueryAjax(this);

        this._contentHolder.innerHTML = markup;

        ComponentTestHelpers.execWhenReady(function() {
            return document.getElementById("ddTest");
        }, function(comp) {
            expect(comp.items).not.toBe(undefined);

            expect(comp.items.length).toBe(data.items.length);

            for (var idx = 0; idx < data.items.length; idx++) {
                expect(comp.items[idx].value).toBe(data.items[idx].id);
                expect(comp.items[idx].text).toBe(data.items[idx].name);
            }
        }, done);
    });

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