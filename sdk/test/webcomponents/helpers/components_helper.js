window.ComponentTestHelpers = (function() {
    return {
        /**
         * This method provides a helper for executing test logic once a webcomponent is ready. It facilitates the
         * development of new unit tests which targets custom elements.
         *
         * @param {function} compSelector A function returning the dom element which is expected to be a webcomponent.
         * @param {function} testLogic The function providing the test logic. It receives the ready webcomponent as argument.
         * @param {function} done Jasmine callback used for finalizing a test case.
         * @returns {undefined} No result.
         */
        execWhenReady: function(compSelector, testLogic, done) {
            var interval = setInterval(function() {
                var comp = compSelector();

                if (!comp._config) {
                    return;
                }

                testLogic(comp);

                clearInterval(interval);

                if (typeof done === "function") {
                    done();
                }
            }, 100);
        }
    };
})();