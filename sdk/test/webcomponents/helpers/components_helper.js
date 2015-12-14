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

                if (!comp || !(comp.isBcComponent && comp.isBcComponent())) {
                    return;
                }

                testLogic(comp);

                clearInterval(interval);

                if (typeof done === "function") {
                    done();
                }
            }, 100);
        },

        /**
         * This method loads an existing test template and returns its string content.
         *
         * @param {String} tplPath The template path we want to load.
         * @param {Object} ctxData The context object which must be passed to template during rendering.
         * @returns {Promise} a promise object which resolves to template string once solved.
         */
        loadTemplate: function(tplPath, ctxData) {
            var result = $.Deferred();

            ctxData = ctxData || {};

            var req = new XMLHttpRequest();
            req.addEventListener("load", function() {
                var tpl = Handlebars.compile(this.responseText);
                result.resolve(tpl(ctxData));
            });
            req.overrideMimeType("text/plain; charset=x-user-defined");
            req.open("GET", tplPath);
            req.send();

            return result.promise();
        },

        /**
         * This method is used to mock jQuery ajax function. It stores received options to the given ctx. Moreover, it
         * returns the data from ctx._ajaxExpectedData as response to the request.
         *
         * @param  {Object} ctx The instance object which is going to be used to store all mocked information.
         * @return {undefined} No result.
         * @example
         * describe("Sample test suite", function() {
         *  beforeEach(function() {
         *      this._ajaxExpectedData = {"a": "b"};
         *      ComponentTestHelpers.mockJqueryAjax(this);
         *  });
         * });
         */
        mockJqueryAjax: function(ctx) {
            spyOn($, "ajax").and.callFake(function(lastOptions) {
                ctx._lastOptions = lastOptions;

                var result = $.Deferred();

                setTimeout(function() {
                    result.resolve(ctx._ajaxExpectedData);
                });

                return result.promise();
            });
        }
    };
})();