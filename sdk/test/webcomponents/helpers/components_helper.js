window.ComponentTestHelpers = (function() {
    return {
        /**
         * This method provides a helper for executing test logic once a webcomponent is ready. It facilitates the
         * development of new unit tests which targets custom elements.
         *
         * @param {String} compSelector A valid query selector for uniquely identifying the dom element for which the test must be executed.
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
                done();
            }, 100);
        }
    };
})();