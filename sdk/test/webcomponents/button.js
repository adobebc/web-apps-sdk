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
describe("bc-button test suite for ensuring everything works as expected.", function() {
    beforeEach(function() {
        this._btnComponent = document.createElement("bc-button");

        expect(this._btnComponent).not.toBe(undefined);
    });

    afterEach(function() {
        try {
            document.body.removeChild(this._btnComponent);
        } catch (e) {
            console.log("Unable to remove bc-button from document .... Probably not added.");
        }
    });

    it("Ensures button is correctly transformed to dom element.", function(done) {
        document.body.appendChild(this._btnComponent);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            var innerButtons = comp.querySelectorAll("button");
            expect(innerButtons.length).toBe(1);

            expect(innerButtons[0]).not.toBe(undefined);
        }, done);
    });

    it("Ensures bc-button component renders correctly and applies all styles received as argument.", function(done) {
        var compStyle = "attr1: a; attr2: b;",
            compNewStyle = "attr3: c;",
            compMarkup = "<bc-button style='" + compStyle + "''>Test button</bc-button>",
            compHolder = document.createElement("div");

        compHolder.innerHTML = compMarkup;
        document.body.appendChild(compHolder);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            var innerButtons = comp.querySelectorAll("button");
            expect(innerButtons.length).toBe(1);

            var innerButton = innerButtons[0];

            expect(innerButton).not.toBe(undefined);
            expect(innerButton.hasAttribute("style")).toBeTruthy();
            expect(innerButton.getAttribute("style")).toBe(compStyle);

            comp.style = compNewStyle;
            expect(innerButton.hasAttribute("style")).toBeTruthy();
            expect(innerButton.getAttribute("style")).toBe(compNewStyle);

            document.body.removeChild(compHolder);
        }, done);
    });

    it("Ensures bc-button component renders correctly and applies all classes received as argument.", function(done) {
        var compClasses = "class1 class2",
            compNewClasses = "class3 class4 class5",
            compMarkup = "<bc-button>Test button</bc-button>",
            compHolder = document.createElement("div");

        compHolder.innerHTML = compMarkup;
        document.body.appendChild(compHolder);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            comp.class = compClasses;
            compClasses = compClasses.split(" ");

            var innerButtons = comp.querySelectorAll("button");
            expect(innerButtons.length).toBe(1);

            var innerButton = innerButtons[0];

            expect(innerButton.classList).not.toBe(undefined);
            expect(innerButton.classList.length).toBe(compClasses.length);

            for (idx = 0; idx < compClasses.length; compClasses++) {
                expect(innerButton.classList[idx]).toBe(compClasses[idx]);
            }

            comp.class = compNewClasses;
            compNewClasses = compNewClasses.split(" ");

            expect(innerButton.classList.length).toBe(compNewClasses.length);

            for (idx = 0; idx < compNewClasses.length; compNewClasses++) {
                expect(innerButton.classList[idx]).toBe(compNewClasses[idx]);
            }

            document.body.removeChild(compHolder);
        }, done);
    });

    it("Ensures button click events are working as expected and carry data with them.", function(done) {
        document.body.appendChild(this._btnComponent);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            var evtData = {"attr1": "mydata"};

            expect(comp).not.toBe(undefined);
            comp.data = evtData;

            $(comp).click(function() {
                expect(this).toBe(comp);
                expect(this.data).toBe(evtData);
            });

            $(comp).click();
        }, done);
    });

    it("Ensures rendered button tag click events correctly are correctly handled by bc-button parent tag.", function(done) {
        document.body.appendChild(this._btnComponent);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            var evtData = {"attr1": "mydata"},
                innerButton = comp.querySelector("button");

            expect(innerButton).not.toBe(undefined);
            comp.data = evtData;

            $(comp).click(function(evt) {
                expect(evt.currentTarget).toBe(comp);
                expect(evt.currentTarget.data).toBe(evtData);
            });

            $(innerButton).click();
        }, done);
    });

    it("Ensures button custom events are correctly wired through dom definition.", function(done) {
        testWireEventsFromDom("data-changed", "GenericFn", done);
    });

    it("Ensures button custom events dom wiring ignores undefined functions.", function(done) {
        testWireEventsFromDom("data-changed", "undefined", done);
    });

    it("Ensures button custom events dom wiring ignores null functions.", function(done) {
        testWireEventsFromDom("data-changed", "null", done);
    });

    it("Ensures button custom events dom wiring ignores empty functions.", function(done) {
        testWireEventsFromDom("data-changed", "", done);
    });

    it("Ensures button custom events dom wiring ignores whitespace functions.", function(done) {
        testWireEventsFromDom("data-changed", "       ", done);
    });

    it("Ensures button custom events dom wiring ignores unknown functions.", function(done) {
        testWireEventsFromDom("data-changed", "My.Unknown.Functions", done);
    });

    /**
     * This function provides a template for testing if wire custom events from dom functionality works as expected.
     * @param {String} evtName Event name to which we want to wire callbacks.
     * @param {function} fnName The function name which must be wired to button data changed event.
     * @param {function} done Jasmine callback which signals end of asynchronous test.
     * @return {undefined} No result.
     */
    function testWireEventsFromDom(evtName, fnName, done) {
        var holder = document.createElement("div"),
            result = undefined,
            compMarkup = "<bc-button onbc-" + evtName + "='" + fnName + "'></bc-button>";

        window.GenericFn = function(evtData) {
            result = evtData;
        };

        holder.innerHTML = compMarkup;
        document.body.appendChild(holder);

        ComponentTestHelpers.execWhenReady(function() {
            return holder.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);

            if (fnName === "GenericFn") {
                comp.data = {"newProp": "property"};

                expect(result).toBe(comp.data);
            }

            var innerButtons = comp.querySelectorAll("button");
            expect(innerButtons.length).toBe(1);

            expect(innerButtons[0]).not.toBe(undefined);

            document.body.removeChild(holder);
        }, done);
    }
});