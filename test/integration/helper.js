(function($) {
    "use strict";
    
    var config = BCAPI.Config.TestServer;

    function mockGenericToken() {
        spyOn(BCAPI.Helper.Site, "getGenericToken").andReturn(config.genericToken);
    }
    function mockSiteToken() {
        spyOn(BCAPI.Helper.Site, "getSiteToken").andReturn(config.siteToken);
    }

    BCAPI.Helper.Test = {
        runTestServer: function() {
            if (!BCAPI.Helper.Site.getRootUrl.isSpy) {
                spyOn(BCAPI.Helper.Site, "getRootUrl").andReturn(config.rootUrl);
            };

            if (!BCAPI.Helper.Site.getSiteId.isSpy) {
                spyOn(BCAPI.Helper.Site, 'getSiteId').andReturn(config.siteId);
            }

            if (!BCAPI.Helper.Site.getGenericToken.isSpy) {
                if (config.genericToken) {
                    mockGenericToken();
                } else {
                    runs(function() {
                        $
                            .ajax({
                                type: 'POST',
                                url: BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/tokens',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    username: config.username,
                                    password: config.password
                                })
                            })
                            .done(function(data) {
                                config.genericToken = data.token;
                                mockGenericToken();
                            });
                    });
                }

                waitsFor(function() {
                    return !!config.genericToken;
                }, 'Get genericToken', config.tokenRequestTimeout);
            }

            if (!BCAPI.Helper.Site.getSiteToken.isSpy) {
                if (config.genericToken) {
                    mockSiteToken();
                } else {
                    runs(function() {
                        $
                            .ajax({
                                type: 'POST',
                                url: BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/sites/' + BCAPI.Helper.Site.getSiteId() + '/tokens',
                                contentType: 'application/json',
                                headers: {
                                    Authorization: BCAPI.Helper.Site.getGenericToken()
                                }
                            })
                            .done(function(data) {
                                config.siteToken = data.token;
                                mockSiteToken();
                            });
                    });

                    waitsFor(function() {
                        return !!config.siteToken;
                    }, 'Get siteToken', config.tokenRequestTimeout);
                }
            }
        }
    };


    
    BCAPI.Helper.Test.PromiseUtils = {
        /**
         * Utility function to test aynchronous workflows. The function
         * takes a scenario object which must contain two properties: `promise`
         * and `complete`. The promise field must be a nullary function which
         * returns a promise. The complete field must be a function with
         * a single argument denoting the result of the promise - if the promise
         * was succesful.
         * A test written with this utility consists of specifying a promise to
         * be run (which may be constructed by chaining multiple promises together)
         * and a `complete` part where all the assertions are made about the
         * outcome of the promise
         * 
         * @param  {object} scenario the scenario object
         */
        promiseScenario: function(scenario) {
            var promiseFun = scenario.promise,
                promiseCompletion = scenario.complete,
                message = scenario.message || 'Promise in testing scenario',
                finished = false,
                success,
                result;
            runs(function() {
                var p = promiseFun();
                p.done(function(x) {
                    result = x;
                    finished = true;
                    success = true;
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log('Promise failed. Error status was: ' + textStatus + '. Error thrown was: ' + errorThrown);
                    finished = true;
                    success = false;
                });
            });
            waitsFor(function() { return finished; }, 'Promise timed out for scenario: ' + message, 5000);
            runs(function() {
                expect(success).toBeTruthy(scenario.message);
                if (success) {
                    promiseCompletion(result);  
                }
            });
        },

        /**
         * Takes a promise and returns another promise which resolves
         * to a boolean value - true if the original promise succeded
         * or false otherwise
         * @param  {promise} promise a then-able promise
         * @return {promise}         a promise indicated the success status of the
         *                           original promise
         */
        promiseFlag: function(promise) {
            return promise.then(function() {
                return true;
            }, function() {
                var p = $.Deferred();
                p.resolve(false);
                return p;
            });
        }
    };

})(jQuery);