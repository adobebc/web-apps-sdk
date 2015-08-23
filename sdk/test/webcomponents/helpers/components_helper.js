window.ComponentTestHelpers = (function() {
    return {
        /**
         * This method provides a helper for executing test logic once a webcomponent is ready. It facilitates the 
         * development of new unit tests which targets custom elements.
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
    }
})();