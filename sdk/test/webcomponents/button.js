describe("bc-button test suite for ensuring everything works as expected.", function() {
    beforeEach(function() {
        this._btnComponent = document.createElement("bc-button");

        expect(this._btnComponent).not.toBe(undefined);
    });

    afterEach(function() {
        try {
            document.body.removeChild(this._btnComponent);
        } catch(e) {
            console.log("Unable to remove bc-button from document .... Probably not added.");
        }
    });

    it("Ensure button is correctly transformed to dom element.", function(done) {
        document.body.appendChild(this._btnComponent);

        ComponentTestHelpers.execWhenReady(function() {
            return document.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);
        }, done);
    });

    it("Ensures button custom events are correctly wired through dom definition.", function(done) {
        testWireEventsFromDom("data-changed", done);
    });

    /**
     * This function provides a template for testing if wire custom events from dom functionality works as expected.
     * @param {String} evtName Event name to which we want to wire callbacks.
     * @param {function} done Jasmine callback which signals end of asynchronous test.
     * @return {undefined} No result.
     */
    function testWireEventsFromDom(evtName, done) {
        var holder = document.createElement("div"),
            result = undefined;

        window.GenericFn = function(evtData) {
            result = evtData;
        };

        holder.innerHTML = "<bc-button onbc-" + evtName + "='GenericFn'></bc-button>";
        document.body.appendChild(holder);

        ComponentTestHelpers.execWhenReady(function() {
            return holder.querySelector("bc-button");
        }, function(comp) {
            expect(comp).not.toBe(undefined);
            comp.data = {"newProp": "property"};

            expect(result).toBe(comp.data);
        }, done);
    }
});