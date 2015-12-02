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
(function($) {
    "use strict";

    /**
     * This disables jQuery ajax internal cache.
     */
    $.ajaxSetup({cache: false});
    
    /**
     * This forces jQuery cookie plugin to set cookie values as received (no urlencode applied).
     */
    $.cookie.raw = true;
    
    /**
     * @namespace BCAPI
     */
    window.BCAPI = {};

})(jQuery);
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
(function($) {

    /**
     * Contains various utility or configuration functions.
     *
     * @namespace BCAPI.Helper
     */
    BCAPI.Helper = {};

	/**
     * Site configuration functions.
     * Override with your own version if needed.
     *
     * @namespace BCAPI.Helper.Site
     */
    BCAPI.Helper.Site = {};

    /**
     * Returns the access_token from either the URL fragment or a session cookie (if it was read from URL and set before in cookie for short term reference)
     *
     * @returns {string} The access_token
     */
    BCAPI.Helper.Site.getAccessToken = function() {
        if (!$.cookie) {
            return $.error("Include jQuery.cookie or override BCAPI.Helper.Site.getAccessToken with your own implementation.");
        }

        var location = BCAPI.Helper.Http.getCurrentLocation();
        var parameters = BCAPI.Helper.Http.getHashFragments(location);
        var paramAccessToken = parameters.access_token;
        var expiresIn = parseInt(parameters.expires_in || String(BCAPI.Config.ACCESS_TOKEN_DEFAULT_EXPIRATION), 10);
        
        if (paramAccessToken) {
            var expiryDate = new Date(Date.now());

            expiryDate.setTime(expiryDate.getTime() + expiresIn * 1000);
            
            var cookieOptions = {
                "expires": expiryDate,
                "path": "/",
                "secure": true
            };

            $.cookie("access_token", paramAccessToken, cookieOptions);
        }

        return paramAccessToken || $.cookie("access_token");
    };

    /**
     * This method obtains secure url required for API calls. It uses the current host from location
     * in order to detect prefix of APIs url. We can do this because BC api js sdk is always used
     * with 3rd party applications served from a separated domain.
     *
     * @param {Window} wnd The window instance which must be used for obtaining the root url.
     * @returns {String} API secure url.
     */
    BCAPI.Helper.Site.getRootUrl = function(wnd) {
        wnd = wnd || window;
 
        var url = [wnd.location.protocol, "//", wnd.location.hostname].join("");
        
        return url;
    };

    /**
     * This method obtains the site unique identifier where the application is running. For the moment it returns
     * current.
     *
     * @returns {String} current.
     */
    BCAPI.Helper.Site.getSiteId = function() {
        return "current";
    };

    /**
     * Http utility functions.
     * Override with your own version if needed.
     *
     * @namespace BCAPI.Helper.Http
     */
    BCAPI.Helper.Http = {};

    /**
     * Utility function to parse and decode parameters from a search or hash location part
     *
     * @param {String} paramString The query parameter string we want to transform to a JSON object.
     * @returns {Object} A JSON object containing all parameters decoded and stored in object properties.
     * @example
     * // returns an object with key value pairs for each parameter (parameterName: parameterValue)
     * result = BCAPI.Helper.Http.getDecodedParameters("access_token=febf7b6a027b49239331cb6fa144&token_type=example")
     * // result = {"access_token": "febf7b6a027b49239331cb6fa144", "token_type": "example"}
     */
    BCAPI.Helper.Http.getDecodedParameters = function(paramString) {
        var params = paramString.split("&"),
            decodedParams = {};
        
        if (params === "") {
            return {};
        }
        
        for (var i = 0; i < params.length; i += 1) {
            var param = params[i],
                firstEqual = param.indexOf("=");
            
            p = [];
            
            if (firstEqual > -1) {
                p.push(param.substr(0, firstEqual));
                p.push(param.substr(firstEqual + 1));
            }
            
            if (p.length === 2) {
                decodedParams[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }

        return decodedParams;
    };

    /**
     * Utility function to get the decoded query parameters from the location passed
     *
     * @param {string} location Location object (e.g. the current location of the document)
     * @returns {object} An object with key value pairs for each query parameter with value
     * @example
     * result = BCAPI.Helper.Http.getQueryParameters("http://myexample.com?param1=value1&param2=value2")
     * // result = {"param1": "value1", "param2": "value2"}
     */
    BCAPI.Helper.Http.getQueryParameters = function(location) {
        if (typeof location.search === undefined || location.search.length === 0) {
            return {};
        }
        return BCAPI.Helper.Http.getDecodedParameters(location.search.substr(1));
    };

     /**
     * Utility function to get the decoded hash parameters from the location passed
     *
     * @param {string} location Location object (e.g. the current location of the document)
     * @returns {object} An object with key value pairs for each hash parameter with value
     * @example
     * result = BCAPI.Helper.Http.getHashFragments("http://myexample.com#param1=value1&param2=value2")
     * // result = {"param1": "value1", "param2": "value2"}
     */
    BCAPI.Helper.Http.getHashFragments = function(location) {
        if (typeof location.hash === undefined || location.hash.length === 0) {
            return {};
        }
        return BCAPI.Helper.Http.getDecodedParameters(location.hash.substr(1));
    };

    /**
     * Helper function to isolate getting actual location, for unit testing
     * @returns {String} The current location of the browser.
     */
    BCAPI.Helper.Http.getCurrentLocation = function() {
        return window.location;
    };

})(jQuery);


/*
 * Microevent library is an open source library provided by jeromeetienne. We added more documentation into the original
 * code so that developers can better understand the API. If you want more information about the microevent implemntation
 * you can visit https://github.com/jeromeetienne/microevent.js.
 */
BCAPI.Helper.MicroEvent = (function() {
    /**
     * MicroEvent class provides and event emitter minimalist implementation which can be
     * used to add on / off / trigger methods to existing classes and literal objects.
     *
     * @public
     * @constructor
     * @memberof BCAPI.Helper
     */
    function MicroEvent() { }

    MicroEvent.prototype = {
        /**
         * This method registers a callback function which is going to be invoked once the specified event is triggered.
         *
         * @public
         * @method
         * @param  {String} event the event name on which the given callback will be invoked.
         * @param  {Function} fct The callback function which is going to be executed once the event will be triggered.
         * @returns {Object} MicroEvent prototype containing all methods.
         * @example
         * function doTask(evtData) {
         *     console.log(evtData);
         * };
         *
         * var comp = document.createElement("bc-component");
         * comp.on("customEvent", doTask);
         */
        on: function(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event] || [];
            this._events[event].push(fct);
        },
        
        /**
         * This method is used in order to unregister the specified function from being executed once the given event is triggered.
         * @param  {String} event The event name from which we want to unregister the callback.
         * @param  {Function} fct The function we want to unregister from event.
         * @returns {undefined} No result is returned by this function.
         *
         * @example
         * function doTask(evtData) {
         *     console.log(evtData);
         * };
         *
         * var comp = document.createElement("bc-component");
         * comp.on("customEvent", doTask);
         * comp.off("customEvent", doTask);
         */
        off: function(event, fct) {
            this._events = this._events || {};
            if (event in this._events === false) {
                return;
            }

            this._events[event].splice(this._events[event].indexOf(fct), 1);
        },

        /**
         * This method is used in order to trigger an event with a variable set of arguments.
         * @param {String} event the event name we want to trigger.
         * @returns {undefined} This method does not return a result.
         */
        trigger: function(event) {
            this._events = this._events || {};
            if (event in this._events === false) {
                return;
            }

            for (var i = 0; i < this._events[event].length; i++) {
                this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };

    /**
     * mixin will delegate all MicroEvent.js function in the destination object
     *
     * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
     *
     * @param {Object} destObject the object which will support MicroEvent.
     * @returns {undefined} This method does not return a result.
     */
    MicroEvent.mixin = function(destObject) {
        var props = ["on", "off", "trigger"];
        for (var i = 0; i < props.length; i++) {
            if (typeof destObject === "function") {
                destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
            } else {
                destObject[props[i]] = BCAPI.Helper.MicroEvent.prototype[props[i]];
            }
        }
        
        return destObject;
    };

    return MicroEvent;
})();/*
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
(function($) {
    /**
     * This namespace holds global configuration of the sdk. You can easily change the values from here
     * in order to influence how various models and services work.
     *
     * @namespace BCAPI.Config
     */
    var Config = {};

    /**
     * Namespace which holds default values for pagination (server side / client side).
     *
     * @namespace BCAPI.Config.Pagination
     * @property {Integer} limit Default number of records we want to retrieve in one paginated API call.
     * @property {Integet} skip Default start record used in one paginated API call.
     * @property {Integer} lowestPage Default lowest page allowed to be requested through paginated API call.
     */
    Config.Pagination = {
        limit: 10,
        skip: 0
    };

    /**
     * @property {String} MAX_DATE the maximum date value allowed on BC side.
     * @memberOf BCAPI.Config
     */
    Config.MAX_DATE = "9999-01-01";

    /**
     * @property {String} ACCESS_TOKEN_DEFAULT_EXPIRATION default access token expiration in seconds..
     * @memberOf BCAPI.Config
     */
    Config.ACCESS_TOKEN_DEFAULT_EXPIRATION = 14400;

    BCAPI.Config = Config;
})(jQuery);
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
(function($) {

    /**
     * @namespace Models
     * @memberOf BCAPI
     */
    BCAPI.Models = {};

    /**
     * Model provides the base class for every model included in Business Catalyst client side sdk. Each new model inherits
     * Model.
     *
     * @name Model
     * @class
     * @memberOf BCAPI.Models
     * @example
     *
     * BCAPI.Examples.Person = BCAPI.Models.Model.extend({
     *  defaults: {
     *      firstName: "John",
     *      lastName: "Doe"
     *  },
     *  endpoint: function() {
     *      return "/api/v2/persons";
     *  }
     * });
     */
    BCAPI.Models.Model = Backbone.Model.extend({
        /**
         * This method must be overriden by each concrete class in order to give the correct relative path
         * to API entry point.
         *
         * @method
         * @instance
         * @returns {String} the model API entry point.
         * @throws An error if endpoint method is not overriden in concrete models.
         * @memberOf BCAPI.Models.Model
         */
        endpoint: function() {
            throw new Error("You must provide an endpoint for your model. E.g: /api/v2/persons");
        },
        /**
         * This method returns the predefined headers which are automatically appended to ajax calls.
         * For instance, Authorization header must be set to site token for most of the calls. If you
         * need a different behavior in your model, please override this method.
         *
         * @method
         * @static
         * @memberOf BCAPI.Models.Model
         * @returns {Object} A list of headers appended to ajax calls.
         */
        headers: function() {
            return {
                "Authorization": BCAPI.Helper.Site.getAccessToken()
            };
        },
        /**
         * This method automatically builds absolute entry point url of the model.
         *
         * This method accepts as parameter the model's endpoint. If this is not
         * specified, then the {@link endpoint} method is called.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Model
         * @param {String} modelEndpoint The model's endpoint.
         * @returns {string} An absolute entry point API.
         */
        urlRoot: function(modelEndpoint) {
            var url = BCAPI.Helper.Site.getRootUrl();
            modelEndpoint = modelEndpoint || this.endpoint();

            if (modelEndpoint.charAt(0) !== "/") {
                modelEndpoint = "/" + modelEndpoint;
            }

            return url + modelEndpoint;
        },
        /**
         * This method change default Backbone save behaviour in order to simplify save invocation.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Model
         * @param {Object} options The options which must be passed to the ajax request.
         * @returns {Promise} A promise object which can be used to handle success / error cases.
         * @example
         * var model = new PersonModel();
         * model.save({
         *  success: function(model, response) {
         *      // handle success logic in here
         *  }
         * });
         */
        save: function(options) {
            options = options || {};
            options.dataType = "text";

            return Backbone.Model.prototype.save.call(this, this.attributes, options);
        },
        /**
         * This method deletes a model using the api.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Model
         * @param {Object} options The options which must be passed to the ajax request.
         * @returns {Promise} A promise object which can be used to handle success / error cases.
         * @example
         * var model = new PersonModel({id: 1});
         * model.destroy({
         *  success: function() {
         *      // do something when delete is successful.
         *  }
         * });
         */
        destroy: function(options) {
            if (!options) {
                options = {};
            }
            options.dataType = "text";

            return Backbone.Model.prototype.destroy.call(this, options);
        },
        /**
         * Sync method is invoked automatically when user tries to create / update a model. It automatically
         * appends the custom headers returned by {@link BCAPI.Models.Model.headers} method.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Model
         * @param {String} method Http method used to persist the state of the current model.
         * @param {BCAPI.Models.Model} model The current model to persist.
         * @param {Object} options Additional options which influence how http call will be done.
         * @returns {Promise} jQuery promise which can be used to determine when request is done.
         */
        sync: function(method, model, options) {
            var customHeaders = this.headers();

            options.headers = options.headers || {};

            for (var headerKey in customHeaders) {
                options.headers[headerKey] = customHeaders[headerKey];
            }

            var xhr = Backbone.Model.prototype.sync.call(this, method, model, options);

            return xhr.then(function() {
                return this;
            }).promise(xhr);
        }
    });

    /**
     * Collection provides the common attributes (pagination, sorting, filtering) for collections powered by Business Catalyst APIs.
     * Every child collection has to provide only the underlining model for this collection.
     *
     * @name Collection
     * @class
     * @memberOf BCAPI.Models
     * @example
     *
     * BCAPI.Examples.PersonCollection = BCAPI.Models.Models.Collection.extend({
     *  model: BCAPI.Examples.Person
     * });
     */
    BCAPI.Models.Collection = Backbone.Collection.extend({
        /**
         * This method initialize the current collection default attributes:
         *
         * + _defaultLimit
         * + _defaultSkip
         *
         * @method
         * @instance
         * @returns {undefined} No result.
         * @memberOf BCAPI.Models.Collection
         */
        initialize: function() {
            this._defaultLimit = BCAPI.Config.Pagination.limit;
            this._defaultSkip = BCAPI.Config.Pagination.skip;
            this._relationFetchPending = 0;
        },
        /**
         * This method returns the predefined headers which are automatically appended to ajax calls.
         *
         * The default implementation delegates this to the model's method.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Model
         * @returns {Object} A list of headers appended to ajax calls.
         */
        headers: function() {
            return this.model.prototype.headers.call();
        },
        /**
         * This method automatically builds the absolute entry point url of the collection.
         *
         * This default implementation of this method assumes that the endpoint and
         * urlRoot of the corresponding model class are static.
         * In case this is not true, and member access is needed to create the endpoint,
         * this method will need to be overriden in the implementing collection class.
         *
         * @method
         * @static
         * @memberOf BCAPI.Models.Collection
         * @returns {string} An absolute entry point API.
         */
        urlRoot: function() {
            var modelEndpoint = this.model.prototype.endpoint();
            return this.model.prototype.urlRoot(modelEndpoint);
        },
        /**
         * This method is used to fetch records into the current collection. Depending on the given options
         * records can be filtered, sorted and paginated. For an example of how this collections are meant to be used
         * please read {@link BCAPI.WebApp}
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Collection
         * @param {Object} options Options used to control what records are fetched from server.
         * @param {Integer} options.limit The total number of records we want to fetch from server.
         * @param {Integer} options.skip Start record index.
         * @param {Object} options.where A JSON object containing the conditions for filtering records on server side.
         * @param {String} options.order An attribute name by which we order records. It can be prefixed with - if you want descending order.
         * @returns {Promise} a promise which can be used to determine http request state.
         */
        fetch: function(options) {
            options = options || {};
            options.headers = this.headers();
            options.dataType = "json";

            this._limit = options.limit;
            this._skip = options.skip;

            if (options.where) {
                this._where = JSON.stringify(options.where);
            }

            this._order = options.order;

            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        /**
         * This method returns the root url of this collection. It internally uses the model
         * assigned to this collection for detecting the absolute entry point.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Collection
         * @returns {String} The url of the current model.
         */
        url: function() {
            var urlWithParams = [this.urlRoot(), "?"];

            for (var key in this.server_api) {
                var val = this.server_api[key].apply(this);

                if (val === undefined) {
                    continue;
                }

                urlWithParams.push("&");
                urlWithParams.push(key);
                urlWithParams.push("=");
                urlWithParams.push(val);
            }

            urlWithParams[2] = "";

            return urlWithParams.join("");
        },
        /**
         * This property defines the attributes which are used to server api.
         *
         * @instance
         * @memberOf BCAPI.Models.Collection
         */
        server_api: {// eslint-disable-line camelcase,no-inline-comments
            "limit": function() {
                return this._limit || this._defaultLimit;
            },
            "skip": function() {
                return this._skip || this._defaultSkip;
            },
            "where": function() {
                return this._where;
            },
            "order": function() {
                return this._order;
            }
        },
        parse: function(response) {
            return response.items;
        }
    });
})(jQuery);/*
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
(function($) {
    "use strict";

    /**
     * This class provides a way of working with individual category items. Each category model
     * has the following accessible attributes (through get method):
     *
     * 1. id
     * 1. name
     * 1. parentId
     * 1. publicAccess
     * 1. fullPath
     *
     * ## Create category
     *
     * ```
     * var category = new BCAPI.Models.Category(
     * 	{"name": "Test category",
     *	"publicAccess": true});
     *
     * var response = category.save();
     *
     * response.done(function() {
     * 	console.log("Category Test category has been created.");
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Status: " + xhrRequest.status);
     *  console.log("Status text: " + xhrRequest.statusText);
     *  console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * ## Load category details
     *
     * ```
     * var category = new BCAPI.Models.Category({"id": 4556});
     * var response = category.fetch();
     *
     * response.done(function() {
     * 	console.log("id: " + category.get("id"));
     * 	console.log("name: " + category.get("name"));
     * 	console.log("parentId: " + category.get("parentId"));
     * 	console.log("publicAccess: " + category.get("publicAccess"));
     *	console.log("fullPath: " + category.get("fullPath"));
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Error status: " + xhrRequest.status);
     * 	console.log("Error text: " + xhrRequest.statusText);
     * 	console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * Update and delete operation per category are not supported.
     *
     * @name Category
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Model
     */
    BCAPI.Models.Category = BCAPI.Models.Model.extend({
        /**
         * This method returns the correct endpoint for the category.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Category
         * @returns {String} Categories endpoint location.
         */
        endpoint: function() {
            return "/api/v2/admin/sites/current/categories";
        }
    });

    /**
     * This class provides a collection for working with categories.
     *
     * ## Load all categories
     *
     * ```
     * var categoriesCollection = new BCAPI.Models.CategoryCollection();
     * var response = categoriesCollection.fetch();
     *
     * response.done(function(categories) {
     * 	categories.each(function(category) {
     *		console.log("id: " + category.get("id"));
     * 		console.log("name: " + category.get("name"));
     * 		console.log("parentId: " + category.get("parentId"));
     * 		console.log("publicAccess: " + category.get("publicAccess"));
     *		console.log("fullPath: " + category.get("fullPath"));
     * 	});
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Error status: " + xhrRequest.status);
     * 	console.log("Error text: " + xhrRequest.statusText);
     * 	console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * @name CategoryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Collection
     */
    BCAPI.Models.CategoryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Category
    });
})(jQuery);
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
(function($) {
    "use strict";

    /**
     * System countries model.
     *
     * @name Country
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     */
    BCAPI.Models.Country = BCAPI.Models.Model.extend({
        /**
         * This method returns the correct endpoint for system countries.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Country
         * @returns {String} Country endpoint location.
         */
        endpoint: function() {
            return "/api/v2/admin/system/countries";
        }
    });

    /**
     * This class provides a collection of the countries available in BC. For more information regarding how to interact
     * with the countries {@link BCAPI.Models.Country}.
     *
     * @name CountryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @example
     * var itemCollection = new BCAPI.Models.CountryCollection();
     */
    BCAPI.Models.CountryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Country
    });

})(jQuery);
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
(function($) {
    "use strict";

    var FILE_REGEX = /^[^\&\%]+$/;

    function getParent(x) {
        return x === "/" ? BCAPI.Models.FileSystem.Root : new BCAPI.Models.FileSystem.Folder(x);
    }

    var Entity = BCAPI.Models.Model.extend({
        "idAttribute": "path",

        constructor: function(a1, a2, a3) {
            var attributes, options, initialProps = {};
            if (typeof a1 === "string") {
                attributes = a2;
                options = a3;
                var path = $.trim(a1);
                if (path === "/") {
                    throw new Error('Cannot instantiate the "/" folder like this. Use BCAPI.Models.FileSystem.Root instead');
                }

                var o = splitPath(path);
                initialProps.parent = getParent(o.parent);
                initialProps.name = o.name;
            } else {
                attributes = a1;
                options = a2;
            }
            BCAPI.Models.Model.call(this, attributes, options);
            if (initialProps) {
                this.set(initialProps);
            }
            this._refreshPath();

            var self = this;
            this.on("change:parent sync", function() {
                self._refreshPath();
            });
        },

        endpoint: function() {
            return "/api/v2/admin/sites/current/storage";
        },
        
        url: function() {
            return this.contentUrl() + "?meta";
        },

        /**
         * Returns the url where the content can be accessed.
         * @return {string} The URL of the resource
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        contentUrl: function() {
            var p = this.get("path");
            if (p[0] === "/") {
                p.substring(1);
            }
            return this.urlRoot() + p;
        },

        validate: function(attr) {
            if (!attr.name || typeof attr.name !== "string" || !FILE_REGEX.test(attr.name)) {
                return "Invalid name for file: [" + attr.name + "]";
            }
            if (!attr.path || attr.path === "/") {
                return "Invalid path for file: [" + attr.path + "]";
            }
        },

        parse: function(result) {
            var dateStr = result.lastModified;
            result.lastModified = new Date(dateStr);
            return result;
        },

        toJSON: function() {
            return _.pick(this.attributes, "name");
        },

        _refreshPath: function() {
            this.set("path", mkFilePath(this.get("parent").get("path"), this.get("name")));
        }
    });

    function mkFilePath(dirPath, name) {
        if (dirPath[dirPath.length - 1] === "/") {
            return dirPath + name;
        }
     
        return dirPath + "/" + name;
    }

    function splitPath(path) {
        var parent, name,
            index = path.lastIndexOf("/");
        if (index < 0) {
            name = path;
        } else {
            parent = path.substring(0, index);
            name = path.substring(index + 1);
        }
        if (!parent) {
            parent = "/";
        }
        return {
            "parent": parent,
            "name": name
        };
    }

    /**
     * @namespace BCAPI.Models.FileSystem
     */
    BCAPI.Models.FileSystem = {};

    /**
     * This class allows you to interact with files stored in your BC site.
     * Usage examples:
     *
     * ### Create a new file.
     *
     * ```javascript
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * var data = 'Hello World !';
     * f.upload(data).done(function() {
     *     console.log('File uploaded succesfully');
     * });
     * ```
     *
     * A file is created in your site's file system only after uploading some
     * content.
     *
     * The content can be any javascript object, including file objects obtained
     * from html upload forms.
     *
     * BCAPI.Models.FileSystem.Root is the root folder in your site's
     * file structure. You can also create a file object by specifying
     * the file's full path.
     *
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File('/hello_world.txt');
     * ```
     *
     * If you omit the `/` at the beginning it will be added automatically.
     *
     * So the below is equivalent to the above instantiation:
     *
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File('hello_world.txt');
     * ```
     *
     * You can also create a file by specifying the name and the parent folder
     * of the file. The following piece of code creates the file `/my/special/file`:
     *
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File({
     *     'parent': new BCAPI.Models.FileSystem.Folder('/my/special'),
     *     'name': 'file'
     * });
     *
     * f.upload(files[0]);
     * ```
     *
     * ### Get the file metadata
     *
     * ```javascript
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.fetch().done(function() {
     *     console.log('File name is: ', f.get('name'));
     *     console.log('Last update date is: ', f.get('lastModified'));
     * });
     * ```
     *
     * ### Download the file content
     *
     * ```javascript
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.download().done(function(content) {
     *     console.log('File content is: ' + content);
     * });
     * ```
     *
     * ### Rename a file
     *
     * Use `save` to change the name of a file.
     *
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File('/my/file');
     * f.set('name', 'new-file');
     * f.save().done(function() {
     *     console.log('File name has been changed. Path is ' + f.get('path'));
     *     //prints: /my/new-file
     * });
     *
     * ### Delete the file
     *
     * ```javascript
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.destroy().done(function() {
     *     console.log('File was destroyed');
     * });
     * ```
     *
     * @class
     * @name File
     * @memberOf BCAPI.Models.FileSystem
     *
     */
    BCAPI.Models.FileSystem.File = Entity.extend({

        /**
         * Uploads a new content for the file. This method can be called if the
         * file isn't yet created - the file will be created afterwards.
         * @param  {any} data the data object which will be the file's content
         * @return {promise}      a promise that will be completed when the file
         *                        is uploaded
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        upload: function(data) {
            return $.ajax(this.contentUrl(), {
                "contentType": "application/octet-stream",
                "type": "PUT",
                "data": data,
                "processData": false,
                "headers": this.headers()
            });
        },

        /**
         * Uploads new content and fetches the metadata for the file which will then
         * be used to populate the object. This method can be called even if the
         * file isn't created yet.
         * Useful if you want to create a file and retrieve it's metadata resulted
         * from the new content immediatly.
         * @param  {any} data The data object
         * @return {promise}      a promise that will be completed when the file
         *                        is uploaded and the new metadata is retrieved.
         *
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        uploadAndFetch: function(data) {
            var self = this;
            return this.upload(data).then(function() {
                return self.fetch();
            });
        },

        /**
         * Downloads the content of the file
         * @return {promise} a promise which will be resolved with
         *                   the content of the file.
         *
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        download: function() {
            return $.ajax(this.contentUrl(), {
                "type": "GET",
                "headers": this.headers()
            });
        },


        initialize: function() {
            this.set("type", "file");
        }
    });

    /**
     * This class allows you to interact with the folders in the file system of your site.
     *
     * ### Creating a folder
     *
     * A folder object can be instantiated in two ways.
     *
     * You can specify the path of the folder:
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder('/folder/path');
     * ```
     *
     * You can also specify the name of the folder, and the parent directory:
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder({
     *     'parent': BCAPI.Models.FileSystem.Root,
     *     'name': 'my-folder'
     * });
     * ```
     *
     * The root directory `/` cannot be created like this. You can only get it
     * with:
     *
     * ```javascript
     * var root = BCAPI.Models.FileSystem.Root;
     * console.log(root.get('path')); //prints '/'
     * ```
     *
     * It should be noted that just creating an instance of the folder class doesn't
     * actually create the folder on the server. If the folder doesn't exist yet,
     * a call to create is required:
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder('my-folder');
     * folder.create().done(function() {
     *     console.log('The folder has been created !');
     * });
     * ```
     *
     * ### Get the folder's metadata
     *
     * You use fetch to obtain the folder's details, including the files & folders that
     * the folder contains:
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder('/my/existing/folder');
     * folder.fetch().done(function() {
     *     console.log('Folder last update date is: ' + folder.get('lastModified'));
     *     console.log('Printing the folder contents: ');
     *     var contents = folder.get('contents');
     *     for (var i = 0; i < contents.length; i++) {
     *         var entity = contents[i];
     *         var isFile = entity instanceof BCAPI.Models.FileSystem.File;
     *         if (isFile) {
     *             console.log('File ' + entity.get('name') + ' updated at ' + entity.get('lastModified'));
     *         } else {
     *             console.log('Folder ' + entity.get('name'));
     *         }
     *     }
     * });
     * ```
     *
     * ### Rename the folder
     *
     * Use `save` to rename a folder:
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder('/my/folder');
     * folder.set('name', 'new-folder');
     * folder.save().done(function() {
     *     console.log('The folder has been renamed');
     *     console.log('Path is now ' + folder.get('path'));
     *     //prints: /my/new-folder
     * });
     * ```
     *
     * ### Delete the folder
     *
     * ```javascript
     * var folder = new BCAPI.Models.FileSystem.Folder('/my-folder');
     * folder.destroy().done(function() {
     *     console.log('Folder was deleted');
     * });
     * ```
     *
     * @class
     * @name Folder
     * @memberOf BCAPI.Models.FileSystem
     *
     */
    BCAPI.Models.FileSystem.Folder = Entity.extend({

        /**
         * Creates a file object with the specified name and that has as parent
         * this folder.
         * @param  {string} name       The name of the file
         * @param  {object} attributes Properties of the file
         * @param  {object} options    Options for the file
         * @return {BCAPI.Models.FileSystem.File} A file that is a child of this folder
         *
         * @memberOf BCAPI.Models.FileSystem.Folder
         * @method
         * @instance
         */
        file: function(name, attributes, options) {
            var fullAttributes = _.extend({"parent": this, "name": name}, attributes);
            return new BCAPI.Models.FileSystem.File(fullAttributes, options);
        },

        initialize: function() {
            this.set("type", "folder");
        },

        /**
         * Creates the specified folder on the server.
         * @return {promise} A promised that will be resolved when the folder is created
         *
         * @memberOf BCAPI.Models.FileSystem.Folder
         * @method
         * @instance
         */
        create: function() {
            return $.ajax(this.contentUrl() + "?type=folder", {
                "type": "PUT",
                "processData": false,
                "headers": this.headers()
            });
        },

        parse: function(result) {
            var items = Entity.prototype.parse.call(this, result);
            var self = this;
            var models = _.map(items.contents, function(obj) {
                obj.parent = self;
                if (obj.type === "file") {
                    return new BCAPI.Models.FileSystem.File(obj);
                } else if (obj.type === "folder") {
                    return new BCAPI.Models.FileSystem.Folder(obj);
                }
            });
            items.contents = models;
            return items;
        }
    });

    var Root = BCAPI.Models.FileSystem.Folder.extend({
        constructor: function() {
            BCAPI.Models.Model.call(this);
            this.set({
                "path": "/",
                "name": "",
                parent: null
            });
        },

        validate: function() { },

        save: function() {
            throw new Error("Operation not supported.");
        },

        destroy: function() {
            throw new Error("Operation not supported.");
        }

    });

    /**
     * The root of the file system
     * @type {BCAPI.Models.FileSystem.Folder}
     * @memberOf BCAPI.Models.FileSystem
     * @static
     */
    BCAPI.Models.FileSystem.Root = new Root();

})(jQuery);

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
(function($) {
    "use strict";

    /**
     * This namespace provides the models and collections for working with BC web applications and their items.
     *
     * @namespace BCAPI.Models.WebApp
     * @memberOf BCAPI.Models
     */
    BCAPI.Models.WebApp = {};

    /**
     * This class provides the model for interacting with web apps.
     *
     * ## Load webapps list
     *
     * ```javascript
     * var apps = new BCAPI.Models.WebApp.AppCollection();
     * apps.fetch({
     *      success: function(webAppItems) {
     *          // handle success
     *      },
     *      error: function(webAppItems, xhr) {
     *          // handle errors
     *      }
     * });
     *
     * apps.each(function(webApp) {
     *      // display logic
     * });
     * ```
     *
     * ## Create webapp
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
     *      "name": "Test app"
     * });
     *
     * app.save({
     *      success: function(webAppItem) {
     *          // handle success
     *      },
     *      error: function(webAppItem, xhr) {
     *          // handle errors
     *      }
     * });
     * ```
     *
     * If you want to refresh collections which rely on Item model please refresh those collections.
     *
     * ## Remove app
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({name: "Test app"});
     * app.destroy({
     *  success: function(webAppItem, response) {
     *      // handle success here.
     *  },
     *  error: function(webAppItem, xhr, options) {
     *      // handle error scenario.
     *  }
     * });
     * ```
     *
     * ## Supported attributes
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
     *  templateId: -1,
     *  uploadFolder: "images",
     *  requiresApproval: true,
     *  allowFileUpload: true,
     *  customerCanAdd: false,
     *  customerCanDelete: false,
     *  customerCanEdit: false,
     *  anyoneCanEdit: false,
     *  requiresPayment: false,
     *  validDays: -1, // never expire
     *  roleId: 0,
     *  hasAddress: false,
     *  disableDetailPages: false,
     *  locationEnabled: false
     * });
     * ```
     *
     * @class
     */
    BCAPI.Models.WebApp.App = BCAPI.Models.Model.extend({
        idAttribute: "name",

        /**
         * Set tot true if you want to save or delete an existing item before fetching it
         *
         * @type {boolean}
         * @memberOf WebApp
         */
        isNotNew: null,

        isNew: function() {
            return this.isNotNew ? false : !this.get("id");
        },

        endpoint: function() {
            return "/api/v2/admin/sites/current/webapps";
        },

        fetch: function() {
            this.isNotNew = true;
            return Backbone.Model.prototype.fetch.apply(this, arguments);
        },

        destroy: function() {
            this.isNotNew = true;
            return Backbone.Model.prototype.destroy.apply(this, arguments);
        }
    });

    /**
     * This class provides a collection that can be used to list all webapps from a site. For
     * more information about a webapp see {@link BCAPI.Models.WebApp.App}.
     *
     * @name AppCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * // fetch all available webapps
     * var appCollection = new BCAPI.Models.WebApp.AppCollection();
     *
     * appCollection.fetch({fetchFields: false,
     *  success: function(webapps) {
     *      webapps.each(function(webapp) {
     *          // no custom fields are retrieved.
     *      });
     *  }
     *
     * @example
     * // extract and fetch webap details from a fetched collection (by webapp id).
     * var webappId = 1,
     *      webapp = appCollection.get(webappId);
     *
     * webapp.fetch({
     *  success: function(webapp) {
     *      // webapp is now fully loaded.
     *  }
     * });
     *
     * @example
     * // extract and fetch webapp details from fetched collection (by webapp index)
     * var idx = 1,
     *      webapp = appCollection.at(idx);
     *
     * webapp.fetch({
     *  success: function(webapp) {
     *      // webapp is now fully loaded.
     *  }
     * });
     */
    BCAPI.Models.WebApp.AppCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.WebApp.App,
        /**
         * We override this method in order to transform each returned item into a strong typed
         * {@link BCAPI.Models.WebApp.App} models.
         *
         * @method
         * @instance
         * @param {Object} response The JSON response received from Web apps api.
         * @returns {Array} A list of web app items.
         * @memberOf BCAPI.Models.WebApp.AppCollection
         */
        parse: function(response) {
            var self = this;

            response = BCAPI.Models.Collection.prototype.parse.call(this, response);

            return response;
        }
    });
})(jQuery);/*
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
(function($) {
    "use strict";

    /**
     * This class provides an array of countries available for a certain webapp. In order to use this collection you must provide
     * a webapp name. For more information regarding how to interact with the countries of a web app read {@link BCAPI.Models.WebApp.Country}.
     *
     * @name Country
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * // assign GB and US countries to Sample webapp.
     * var countries = new BCAPI.Models.WebApp.Country("Sample webapp", {"items": ["GB", "US"]});
     * countries.save();
     */
    BCAPI.Models.WebApp.Country = BCAPI.Models.Model.extend({

        constructor: function(webappName, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
        },
        /**
         * This method returns the correct endpoint
         * for the webapp countries
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         * @returns {String} The endpoint of the countries api.
         */
        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/countries");
            return url.join("");
        },
        /**
         * This method returns the data to be json-ified when saving
         * The API only recieves an array of strings, so we have to extract it
         * from the items field.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         * @returns {Object} JSON representation of the current collection.
         */
        toJSON: function() {
            return this.get("items");
        },

        /**
         * This method performs the save to the server
         * It is overwritten here to always force a PUT operation on the endpoint
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         * @param {Object} options The options which must be passed to ajax request.
         * @returns {Promise} A promise which can be used to detect success / error.
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);
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
(function($) {
    "use strict";

    var endpointGenerator = function(webappName) {
        return "/api/v2/admin/sites/current/webapps/" + webappName + "/fields";
    };

    /**
     * This class provides support for custom fields description belonging to {@link BCAPI.Models.WebApp.App}
     *
     * ## Create a new custom field
     *
     * ```javascript
     * var customField = new BCAPI.Models.WebApp.CustomField("Test webapp", {
     *  "id": 1,
     *  "name": "Part code",
     *  "type": "DataSource",
     *  "listItems": null,
     *  "dataSource": "Part Codes",
     *  "required": false
     * }, true);
     *
     * customField.save({
     *  success: function(fieldModel) {
     *      // do something on success.
     *  }
     * });
     * ```
     *
     * In the attributes, the id must be passed.
     *
     * The last parameter specifies if the custom field is new or exists already. This is used
     * to determine the correct HTTP verb to call since the id is always passed.
     * If omitted, it is assumed that the custom field is new.
     *
     * @name CustomField
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     */
    BCAPI.Models.WebApp.CustomField = BCAPI.Models.Model.extend({
        constructor: function(webappName, attributes, isNew, options) {
            BCAPI.Models.Model.call(this, attributes, options);

            this._isNew = _.isBoolean(isNew) ? isNew : true;

            if (this._isNew && (_.isUndefined(attributes) || _.isUndefined(attributes.id))) {
                throw new Error("The id for the custom field must be specified.");
            }

            var id = Number(attributes.id);
            if (!_.isNumber(id) || _.isNaN(id) || id <= 0) {
                throw new Error("The id for the custom field must be a positive number.");
            }

            this._webappName = webappName;
            this.set({
                webapp: new BCAPI.Models.WebApp.App({
                    name: webappName
                })
            });
        },
        /**
         * This method returns the endpoint for custom fields api.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {String} The endpoint url for webapp custom fields.
         */
        endpoint: function() {
            return endpointGenerator(this._webappName);
        },
        /**
         * This method is overriden in order to remove *webapp* field from API request.
         * Webapp it's a pseudo attribute used internally by an item collection.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @param {Object} options The options which must be passed as parameter to inherited ttoJSON method.
         * @returns {Object} The json representation of the current custom field.
         */
        toJSON: function(options) {
            var result = BCAPI.Models.Model.prototype.toJSON.call(this, options);

            delete result.webapp;

            return result;
        },
        /**
         * This method is overriden in order to use the correct HTTP verb on creation and update
         * since the id of the item is always passed.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {Boolean} True if the model is new and false otherwise.
         */
        isNew: function() {
            return this._isNew;
        }
    });

    /**
     * This class provides a collection for working with web app custom fields. In order to use this collection you must provide
     * a webapp name. For more information regarding custom fields read {@link BCAPI.Models.WebApp.Item}.
     *
     * @name CustomFieldCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * var fieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection("Sample webapp");
     */
    BCAPI.Models.WebApp.CustomFieldCollection = BCAPI.Models.Collection.extend({
        constructor: function(webappName, attributes, options) {
            BCAPI.Models.Collection.call(this, attributes, options);

            this._webappName = webappName;
        },

        model: BCAPI.Models.WebApp.CustomField,

        /**
         * This method is overriden because we need access to members in order to create the endpoint.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {string} An absolute entry point API.
         */
        urlRoot: function() {
            return this.model.prototype.urlRoot(endpointGenerator(this._webappName));
        },
        /**
         * We override this method in order to transform each returned item into a strong typed
         * {@link BCAPI.Models.WebApp.CustomField} models.
         *
         * @method
         * @instance
         * @param {Object} response The JSON response received from CustomField api.
         * @returns {Array} A list of web app custom fields.
         * @memberOf BCAPI.Models.WebApp.CustomField
         */
        parse: function(response) {
            response = BCAPI.Models.Collection.prototype.parse.call(this, response);

            var fields = [],
                self = this,
                Model = self.model;

            _.each(response, function(field) {
                fields.push(new Model(self._webappName, field, false));
            });

            return fields;
        }
    });
})(jQuery);/*
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
(function($) {
    "use strict";

    var endpointGenerator = function(webappName) {
        var url = ["/api/v2/admin/sites/current/webapps/"];
        url.push(webappName);
        url.push("/items");

        return url.join("");
    };

    /**
     * This class provides useful operations for interacting with web app items. You can find various examples of how to
     * use it.
     *
     * ## Load items paginated
     *
     * ```javascript
     * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
     * items.fetch({
     *      skip: 10, limit: 100,
     *      success: function(webAppItems) {
     *          // handle success
     *      },
     *      error: function(webAppItems, xhr) {
     *          // handle errors
     *      }
     * });
     *
     * items.each(function(webAppItem) {
     *      // display logic
     * });
     * ```
     *
     * ## Filtering items
     *
     * ```javascript
     * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
     * items.fetch({
     *      where: {"name": ""Web app item new"},
     *      success: function(webAppItems) {
     *          // handle success
     *      },
     *      error: function(webAppItems, xhr) {
     *          // handle errors
     *      }
     * });
     * ```
     *
     * ## Ordering items
     *
     * ```javascript
     * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
     * items.fetch({
     *      order: "-name",
     *      success: function(webAppItems) {
     *          // handle success
     *      },
     *      error: function(webAppItems, xhr) {
     *          // handle errors
     *      }
     * });
     * ```
     *
     * ## All in one usage
     *
     * ```javascript
     * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
     * items.fetch({
     *      skip: 10, limit: 100,
     *      where: {"name": ""Web app item new"},
     *      order: "-name",
     *      success: function(webAppItems) {
     *          webAppItems.each(function(webAppItem) {
     *              // display logic
     *          });
     *      },
     *      error: function(webAppItems, xhr) {
     *          // handle errors
     *      }
     * });
     * ```
     *
     * ## Create item
     *
     * ```javascript
     * var item = new BCAPI.Models.WebApp.Item("Test webapp", {
     *      "name": "Test item"
     * });
     *
     * var response = item.save({
     *      success: function(webAppItem) {
     *          // handle success
     *      },
     *      error: function(webAppItem, xhr) {
     *          // handle errors
     *      }
     * });
     * ```
     *
     * If you want to refresh collections which rely on Item model please refresh those collections.
     *
     * ## Remove item
     *
     * ```javascript
     * var item = new BCAPI.Models.WebApp.Item("Test webapp", {id: 1});
     * item.destroy({
     *  success: function(webAppItem, response) {
     *      // handle success here.
     *  },
     *  error: function(webAppItem, xhr, options) {
     *      // handle error scenario.
     *  }
     * });
     * ```
     *
     * @name Item
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     *
     * var item = new BCAPI.Models.WebApp.Item({
     *  "name": "Item7",
     *  "weight": 7,
     *  "releaseDate": "2013-01-30",
     *  "expiryDate": "9999-01-01",
     *  "enabled": true,
     *  "slug": "item7",
     *  "description": "item7 description",
     *  "roleId": null,
     *  "submittedBy": -1,
     *  "templateId": 123,
     *  "address": "item7_address",
     *  "city": "item7_city",
     *  "state": "item7_state",
     *  "zipCode": "000007",
     *  "country": "US",
     *  "fields": {
     *      "field_string_required": "item7_field1_value",
     *      "field2_string_optional": "item7_field2_value",
     *      "field3_number": 7,
     *      "field4_dateTime": "2012-01-20",
     *      "field5_list": "item1"
     *  }
     * });
     */
    BCAPI.Models.WebApp.Item = BCAPI.Models.Model.extend({
        constructor: function(webappName, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);

            this._webappName = webappName;
            this.set({
                webapp: new BCAPI.Models.WebApp.App({
                    name: webappName
                })
            });
        },
        /**
         * This method returns the correct endpoint for the web app items.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Item
         * @returns {String} The endpoint url belonging to webapp item api.
         */
        endpoint: function() {
            return endpointGenerator(this._webappName);
        },
        /**
         * This method is overriden in order to remove *webapp* field from API request.
         * Webapp it's a pseudo attribute used internally by an item collection.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Item
         * @param {Object} options The options object which must be passed to toJSON method inherited from {@link BCAPI.Models.Model}.
         * @returns {Object} The json representation of the webapp item.
         */
        toJSON: function(options) {
            var result = BCAPI.Models.Model.prototype.toJSON.call(this, options);

            delete result.webapp;

            return result;
        }
    });

    /**
     * This class provides a collection for working with web app items. In order to use this collection you must provide
     * a webapp name. For more information regarding how to interact with web app items read {@link BCAPI.Models.WebApp.Item}.
     *
     * @name ItemCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     *
     * @example
     * // load items for a specified webapp (only system fields are automatically loaded).
     * var itemCollection = new BCAPI.Models.WebApp.ItemCollection("Sample webapp");
     * itemCollection.fetch({
     *  success: function(items) {
     *      // handle items (only system fields available in each item).
     *
     *      items.each(function(item) {
     *          item.fetch({
     *              success: function(itemDetails) {
     *                  // do something with item details.
     *              }
     *          });
     *      });
     *  }
     * });
     */
    BCAPI.Models.WebApp.ItemCollection = BCAPI.Models.Collection.extend({
        constructor: function(webappName, models, options) {
            BCAPI.Models.Collection.call(this, models, options);

            this.webappName = webappName;
        },
        model: BCAPI.Models.WebApp.Item,
        /**
         * This method is overriden because we need access to members in order to create the endpoint.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {string} An absolute entry point API.
         */
        urlRoot: function() {
            return this.model.prototype.urlRoot(endpointGenerator(this.webappName));
        },
        /**
         * We override this method in order to transform each returned item into a strong typed
         * {@link BCAPI.Models.WebApp.Item} models.
         *
         * @method
         * @instance
         * @param {Object} response The JSON response received from Items api.
         * @returns {Array} A list of web app items.
         * @memberOf BCAPI.Models.WebApp.ItemCollection
         */
        parse: function(response) {
            response = BCAPI.Models.Collection.prototype.parse.call(this, response);

            var items = [],
                self = this,
                Model = self.model;

            _.each(response, function(item) {
                items.push(new Model(self.webappName, item));
            });

            return items;
        }
    });
})(jQuery);/*
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
(function($) {
    "use strict";

    /**
     * This class provides a way of retrieving and assigning categories to items
     * As an array of category ids that can be retrieved via the {@link BCAPI.Models.CategoryCollection}
     *
     * @name ItemCategory
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @augments BCAPI.Models.Model
     * To get the categories assigned to an item
     * @example
     * var itemCategories = new BCAPI.Models.WebApp.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.fetch({
     *                         success: function(data) {
     *                             _.each(data.get("items"), function(categoryId) {
     *                                 var category = new BCAPI.Models.Category({id: categoryId});
     *                                 category.fetch({success: doSomethingWithCategName, error: onError})
     *                             })
     *                         },
     *                         error: function(data, xhr){}
     *                      });
     *
     *
     * To assign a set of categories:
     * @example
     * var itemCategories = new BCAPI.Models.WebApp.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.set('items', [1,2,3,4]);
     * itemCategories.save({success: onSaveOK, error: onSaveFailed})
     */

    BCAPI.Models.WebApp.ItemCategory = BCAPI.Models.Model.extend({
        defaults: {
            items: []
        },

        constructor: function(webappName, webappItemId, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
            this._webappItemId = webappItemId;
        },

        /**
         * This method returns the correct endpoint
         * for the specific webapp and item id.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.ItemCategory
         * @return {String} The endpoint url belonging to web app item categories api.
         */
        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/items/");
            url.push(this._webappItemId);
            url.push("/categories");
            return url.join("");
        },

        /**
         * This method returns the data to be json-ified when saving
         * The API only recieves an array of ints, so we have to extract it
         * from the items field.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.ItemCategory
         * @returns {Array} An array of item categories.
         */
        toJSON: function() {
            return this.get("items");
        },

        /**
         * This method performs the save to the server
         * It is overwritten here to always force a PUT operation on the endpoint
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.ItemCategory
         * @param {Object} options The options object which must be passed to ajax request.
         * @returns {Promise} a promise object which can be used to determine save success / error.
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);
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
(function($) {
    /**
     * This namespace holds all SDK classes used for creating new components.
     *
     * ![BCAPI Components Overview](assets/ui-sdk-bcapi-components.png)
     *
     * @namespace BCAPI.Components
     */
    BCAPI.Components = BCAPI.Components || {};

    /**
     * This namespace holds all available data sources which can be plugged into UI components. Below, you can find
     * a diagram providing the foundation classes which are provided out of the box.
     *
     * ![BCAPI Datasources Overview](assets/ui-sdk-bcapi-datasources.png)
     *
     * @namespace BCAPI.Components.DataSources
     */
    BCAPI.Components.DataSources = BCAPI.Components.DataSources || {};

    /**
     * This namespace holds all available validators which can be wired or are used directly by components.
     *
     * ![BCAPI Validation Overview](assets/ui-sdk-bcapi-validation.png)
     *
     * @namespace BCAPI.Components.Validation
     */
    BCAPI.Components.Validation = BCAPI.Components.Validation || {};

    /**
     * This namespace holds all security classes which can be reused by all components. Because modern platforms
     * provides OAuth 2 authorization this namespace also provides helper classes for easily accessing oauth 2
     * specific tokens and for renewing access.
     *
     * ![BCAPI Security Overview](assets/ui-sdk-bcapi-security.png)
     *
     * @namespace BCAPI.Security
     */
    BCAPI.Security = BCAPI.Security || {};

    /**
     * This namespace holds all messaging layers which can be used to communicate between apps and BC environment.
     * Moreover, this provides the classes required to achieve intercommunication between components from the same app.
     *
     * ![BCAPI Messaging Overview](assets/ui-sdk-bcapi-messaging.png)
     *
     * @namespace BCAPI.Messaging
     */
    BCAPI.Messaging = BCAPI.Messaging || {};

    /**
     * This class provides the all common methods inherited by every component.
     *
     * @name  Component
     * @public
     * @constructor
     * @memberof BCAPI.Components
     */
    function Component() {}

    BCAPI.Helper.MicroEvent.mixin(Component.prototype);

    /**
     * This constant holds the dom attribute prefix used to wire custom listeners to component events.
     *
     * @constant
     * @type {String}
     */
    Component.prototype.__BCON_EVT_PREFIX = "onbc-";

    /**
     * This constant holds the type of component which can later on be used to discriminate between regular dom elements
     * and concrete BCAPI components.
     *
     * @constant
     * @type {String}
     */
    Component.prototype.__COMPTYPE__ = "BcApiComponent";

    /**
     * This method standardizes the way components can be configured / altered. Each concrete component must provide an
     * implementation for this method.
     *
     * @public
     * @method configure
     * @instance
     * @abstract
     * @memberof BCAPI.Components.Component
     * @param {Object} opts The object containing all options which must be configured.
     * @returns {undefined} No result.
     * @example
     * var button = document.getElementById("myButton");
     * button.configure({"label": "My first button"});
     */
    Component.configure = function(opts) {};

    /**
     * This method provides a standard implementation so that each component correctly handles attached to dom event.
     * Even though it should be enough for most of the components, if for some reason you need to override it, make
     * sure you first invoke **this.__base.attached();**
     *
     * @name  attached
     * @method
     * @public
     * @instance
     * @memberof BCAPI.Components.Component
     * @returns {undefined} No result.
     */
    Component.prototype.attached = function() {
        this._wireCustomEventsFromDom();

        console.log(this.is + ": attached to dom.");
    };
    /**
     * This method provides the algorithm for changing css classes for specified dom elements.
     *
     * @public
     * @instance
     * @method changeClass
     * @param {String} newClass A whitespace separated list of classes.
     * @param {HTMLDomElement} domElem The dom element instance for which we want to change the classes.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype.changeClass = function(newClass, domElem) {
        if (!domElem || !newClass) {
            return;
        }

        var classes = newClass.split(" ");

        while (domElem.classList.length > 0) {
            domElem.classList.remove(domElem.classList[0]);
        }

        for (var idx = 0; idx < classes.length; idx++) {
            try {
                domElem.classList.add(classes[idx]);
            } catch (ex) {
                ex = ex;
            }
        }
    };

    /**
     * This method provides a shortcut approach for wiring callbacks to component emitted events.
     *
     * @method wireEvents
     * @public
     * @instance
     * @memberof BCAPI.Components.Component
     * @param {Object} evts A dictionary containing a list of event names and the callbacks which listen to each event.
     * @returns {undefined} No result.
     *
     * @example
     * function onTextFieldChange(evtData) {
     *     console.log(evtData);
     * }
     *
     * function onTextFieldSearch(evtData) {
     *     console.log(evtData);
     * }
     *
     * var component = new BCAPI.Components.TextField();
     * component.wireEvents({
     *     "textfield:change": onTextFieldChange,
     *     "textfield:search": onTextFieldSearch
     * });
     */
    Component.prototype.wireEvents = function(evts) {
        if (evts === undefined || evts === null) {
            throw new BCAPI.Components.Exceptions.WireEventException("You can not wire undefined / null events into component.");
        }

        for (var evtName in evts) {
            if (!evts[evtName]) {
                throw new BCAPI.Components.Exceptions.WireEventException("Event name " + evtName + " does not have callback specified.");
            }

            this.on(evtName, evts[evtName]);
        }
    };

    /**
     * This method can be used in order to determine if a given dom attribute is a bc component or not.
     *
     * @public
     * @method  isBcComponent
     * @instance
     * @memberof BCAPI.Components.Component
     * @return {Boolean} True if the current component inherits from Component and false otherwise.
     */
    Component.prototype.isBcComponent = function() {
        return this.__COMPTYPE__ === "BcApiComponent";
    };

    /**
     * This method configures the items from this component by extracting the inner html defined datasource.
     * If the datasource exists, then it is set as component datasource.
     *
     * @protected
     * @instance
     * @method _wireDataSourceFromMarkup
     * @return {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._wireDataSourceFromMarkup = function() {
        var dataSource = Polymer.dom(this).querySelector("*[rel='datasource']");

        if (dataSource && dataSource.isDataSource && dataSource.isDataSource()) {
            this.dataSource = dataSource;
        }
    };

    /**
     * This method wires all listeners to custom events declared using dom attributes.
     *
     * @private
     * @instance
     * @method  _wireCustomEventsFromDom
     * @returns {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._wireCustomEventsFromDom = function() {
        var customEvents = this.customEvents || [],
            wiredEvents = {};

        for (var i = 0; i < customEvents.length; i++) {
            var evtName = this._getDomEvtName(customEvents[i]),
                attrName = this.__BCON_EVT_PREFIX + evtName;

            if (!this.hasAttribute(attrName)) {
                continue;
            }

            listener = this.getAttribute(attrName);

            var listenerParts = listener.split("."),
                ctx = window[listenerParts[0]],
                action = undefined;

            for (var j = 0; j < listenerParts.length; j++) {
                var partName = listenerParts[j];

                action = (action || window)[partName];

                if (!action) {
                    console.log(this.is + ": Unable to wire " + listener + " to event " + evtName);
                    continue;
                }
            }

            wiredEvents[evtName] = (function(action, ctx) {
                return function(evtData) {
                    action.call(ctx, evtData);
                };
            })(action, ctx);
        }

        this.wireEvents(wiredEvents);
    };

    /**
     * This method obtains the dom event name for a given custom event name. Custom event names are camel case while in
     * dom they are all lowercase and each part from camelcase is separated by dashes.
     *
     * @private
     * @instance
     * @method  _getDomEvtName
     * @param  {String} evtName Custom event name as defined at component level.
     * @return {String} Dom event name which matches the custom event name.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._getDomEvtName = function(evtName) {
        var domEvtName = [];

        evtName = evtName || "";

        for (var i = 0; i < evtName.length; i++) {
            var currChar = evtName.charAt(i);

            if (currChar === currChar.toUpperCase()) {
                domEvtName.push("-");
            }

            domEvtName.push(currChar.toLowerCase());
        }

        return domEvtName.join("");
    };

    BCAPI.Components.Component = BCAPI.Components.Component || Component;

    /**
     * This class provides the core class from BC SDK used to support components creation.
     * It enforces each component descriptor to inherit several classes in order to create a uniform contract
     * across all web components we provide.
     *
     * @name ComponentsFactory
     * @public
     * @constructor
     * @memberof BCAPI.Components
     * @example
     * var customComponent = {
     *     is: "custom-component"
     * };
     *
     * customComponent = BCAPI.Components.ComponentsFactory.get(obj);
     *
     * Polymer(customComponent);
     */
    function ComponentsFactory() { }

    /**
     * This method extends the given component descriptor with various methods and properties specific to BC. In addition,
     * it creates a special property named **__base** which can be used to access {@link BCAPI.Components.Component} inherited methods.
     *
     * @name  get
     * @public
     * @method
     * @instance
     * @param {Object} component The component descriptor we want to transform to {@link BCAPI.Components.Components}.
     * @return {WebComponent} The component instance with all methods in place.
     * @memberof BCAPI.Components.ComponentsFactory
     * @example
     * var webComp = {
     *     "is": "bc-button",
     *     attached: function() {
     *         this.__base.attached.apply(this);
     *     }
     * };
     *
     * Polymer(BCAPI.Components.ComponentsFactory.get(webComp));
     */
    ComponentsFactory.prototype.get = function(component) {
        var baseComp = new Component();

        $.extend(component, Component.prototype);
        component.__base = baseComp;

        return component;
    };

    BCAPI.Components.ComponentsFactory = BCAPI.Components.ComponentsFactory || new ComponentsFactory();
})($);/*
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
(function() {
    /**
     * This namespace provides all custom exceptions which can be used by compeontns in order to notify custom error
     * situations.
     *
     * @namespace  BCAPI.Components.Exceptions
     */
    BCAPI.Components.Exceptions = BCAPI.Components.Exceptions || {};

    /**
     * This class provides a custom exception which notifies developers about invalid attempt to wire events to
     * a component.
     *
     * @public
     * @class WireEventException
     * @param {String} msg The message which must be displayed to developers.
     * @memberof BCAPI.Components.Exceptions
     */
    function WireEventException(msg) {
        Object.defineProperty(this, "msg", {
            writable: false,
            value: msg,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "errorType", {
            writable: false,
            value: "BCAPI.Components.Exceptions.WireEventException",
            enumerable: true,
            configurable: true
        });
    }

    WireEventException.prototype = Object.create(Error.prototype);

    BCAPI.Components.Exceptions.WireEventException = WireEventException;


    /**
     * This class provides a custom exception which notifies developers an operation is not implemented or supported.
     *
     * @public
     * @class NotImplementedException
     * @param {String} msg The message which must be displayed to developers.
     * @memberof BCAPI.Components.Exceptions
     */
    function NotImplementedException(msg) {
        Object.defineProperty(this, "msg", {
            writable: false,
            value: msg,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "errorType", {
            writable: false,
            value: "BCAPI.Components.Exceptions.NotImplementedException",
            enumerable: true,
            configurable: true
        });
    }

    NotImplementedException.prototype = Object.create(Error.prototype);

    BCAPI.Components.Exceptions.NotImplementedException = NotImplementedException;

    /**
     * This class provides a custom exception which notifies developers about a missing or bad argument. This
     * exception usually occurs when invoking a method with the wrong number of arguments.
     *
     * @public
     * @class BadArgumentException
     * @param {String} msg The message which must be displayed to developers.
     * @param {String} arg The argument which caused this exeption.
     * @memberof BCAPI.Components.Exceptions
     */
    function BadArgumentException(msg, arg) {
        Object.defineProperty(this, "msg", {
            writable: false,
            value: msg,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "arg", {
            writable: false,
            value: arg,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "errorType", {
            writable: false,
            value: "BCAPI.Components.Exceptions.BadArgumentException",
            enumerable: true,
            configurable: true
        });
    }

    BadArgumentException.prototype = Object.create(Error.prototype);

    BCAPI.Components.Exceptions.BadArgumentException = BadArgumentException;
})();/*
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
(function($) {
    /**
     * This class provides the contract which must be implemented by each concrete datasource from the sdk.
     * A datasource is a data provider which can be plugged into various components from the framework in order to
     * display the data in different layouts. Most components offered by the sdk supports rendering data from a datasource.
     *
     * Each concrete implementation might have its own supported options and it is not mandatory to provide
     * an implementation for all the methods from DataSource.
     *
     * ## Events
     *
     * | Event name | Event description |
     * | ---------------- | ----------------------- |
     * | attached | This event is emmited by the datasource once it is attached to dom. |
     *
     * @class  DataSource
     * @memberof BCAPI.Components.DataSources
     */
    function DataSource() { }

    DataSource.prototype = BCAPI.Components.ComponentsFactory.get(DataSource.prototype);

    /**
     * This method is used to tell that this components is a datasource implementation.
     *
     * @public
     * @instance
     * @method  isDataSource
     * @return {Boolean} True.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.isDataSource = function() {
        return true;
    };

    /**
     * This method is invoked automatically when the datasource is ready. At this point. the datasource has not been
     * attached to main dom. Internally it will try to locate the closest parent which supports datasource and wire itself into parent component under dataSource property.
     *
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataSources.JsonDataSource
     */
    DataSource.prototype.attached = function() {
        this.__base.attached.apply(this);
        var parentNode = this.parentNode;

        while (parentNode && !parentNode.supportsDataSource) {
            parentNode = parentNode.parentNode;
        }

        if (parentNode && parentNode.supportsDataSource) {
            parentNode.dataSource = this;
        }

        this.trigger("attached", {});
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for loading
     * an individual item.
     *
     * @public
     * @instance
     * @method  fetch
     * @param  {Object} opts An object describing all relevant information for the fetch operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.fetch = function(opts) {
        throw new BCAPI.Components.Exceptions.NotImplementedException("fetch is not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for loading
     * a subset of items belonging to the datasource.
     *
     * @public
     * @instance
     * @method  list
     * @param  {Object} opts An object describing all relevant information for the list operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.list = function(opts) {
        throw new BCAPI.Components.Exceptions.NotImplementedException("list is not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for adding
     * a new item to the datasource.
     *
     * @public
     * @instance
     * @method  create
     * @param  {Object} opts An object describing all relevant information for the create operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.create = function(opts) {
        throw new BCAPI.Components.Exceptions.NotImplementedException("create is not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for updating
     * an existing item from the datasource.
     *
     * @public
     * @instance
     * @method  update
     * @param  {Object} opts An object describing all relevant information for the update operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.update = function(opts) {
        throw new BCAPI.Components.Exceptions.NotImplementedException("update is not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for removing
     * an existing item from the datasource.
     *
     * @public
     * @instance
     * @method  delete
     * @param  {Object} opts An object describing all relevant information for the delete operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.delete = function(opts) {
        throw new BCAPI.Components.Exceptions.NotImplementedException("delete is not implemented.");
    };

    BCAPI.Components.DataSources.DataSource = BCAPI.Components.DataSources.DataSource || DataSource;
})($);/*
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
(function() {
    /**
     * This class provides the bc security context implementation which can be used for accessing bc apis.
     *
     * @name BcSecurityContext
     * @constructor
     * @memberof BCAPI.Security
     * @param {BCAPI.Security.AccessToken} accessToken the current access token used by the application.
     * @param {BCAPI.Security.User} user the current logged in user.
     * @param {Object} config the configuration object used to describe the bc environment for the current session.
     * @param {String} config.siteUrl the secure site url on which api calls can be made.
     * @param {String} config.accessToken the current access token encrypted value.
     */
    function BcSecurityContext(accessToken, user, config) {
        this.accessToken = accessToken;
        this.user = user;
        this.config = config;
    }

    /**
     * This method will be able to renew app access in the future. At the moment this operation is not supported.
     *
     * @name renewAccess
     * @public
     * @method
     * @returns {undefined} Does not return a result at this point.
     */
    BcSecurityContext.prototype.renewAccess = function() {
        throw new BCAPI.Components.Exceptions.NotImplementedException("Not supported at the moment.");
    };

    BCAPI.Security.BcSecurityContext = BcSecurityContext;
})();/*
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
(function() {
    /**
     * This class provides the model which can be used for accessing token attributes.
     *
     * @name AccessToken
     * @constructor
     * @memberof BCAPI.Security
     * @param {Object} tokenData the data information describing the token.
     * @param {String} tokenData.userId the user unique identifier (might be string or numeric).
     * @param {BCAPI.Security.User} tokenData.user the user object.
     * @param {String} tokenData.token the token encrypted string which must be passed together with each api call.
     * @param {Integer} tokenData.expiresIn the token expiration period (expressed in seconds).
     * @param {Array} tokenData.scopes the token stored scopes.
     * @param {Date} tokenData.createdAt the time when this token was created.
     */
    function AccessToken(tokenData) {
        tokenData = tokenData || {};

        this.userId = tokenData.userId;
        this.user = tokenData.user;
        this.token = tokenData.token;
        this.expiresIn = parseInt(tokenData.expiresIn, 10);
        this.scopes = tokenData.scopes || [];
        this.createdAt = tokenData.createdAt;
    }

    BCAPI.Security.AccessToken = BCAPI.Security.AccessToken || AccessToken;
})();/*
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
(function() {
    /**
     * This class provides the model for storing and accessing user information from UI SDK applications.
     *
     * @name User
     * @constructor
     * @memberof BCAPI.Security
     * @param {Object} userInfo the user information used to populate user object.
     * @param {String} userInfo.userId user unique identifier.
     * @param {String} userInfo.firstName user first name.
     * @param {String} userInfo.lastName user last name.
     */
    function User(userInfo) {
        this.userId = userInfo.userId || userInfo.id;
        this.firstName = userInfo.firstName;
        this.lastName = userInfo.lastName;
    }

    BCAPI.Security.User = User;
})();/*
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
(function($) {
    BCAPI.Security.__bcSecurityCtxLoader = undefined;
    BCAPI.Security._securityCfg = undefined;
    BCAPI.Security._bcSecurityCtx = undefined;

    /**
     * This method provides a simple way for setting all security details when running an app.
     *
     * @public
     * @method
     * @name configure
     * @memberof BCAPI.Security
     * @param {Object} securityCfg this is the security configuration required by the app.
     * @param {String} securityCfg.site this is the site secure url where api calls will be done.
     * @param {String} securityCfg.accessToken this is the site access token used for api calls.
     * @returns {undefined} does not return a result.
     * @example
     * BCAPI.Security.configure({
     *  bc: {
     *    "site": "https://raducosnita-max2014.worldsecuresystems.com",
     *    "accessToken": "<your access token comes here>"
     *  }
     *});
     */
    BCAPI.Security.configure = BCAPI.Security.configure || function(securityCfg) {
        if (!securityCfg || JSON.stringify(securityCfg) === "{}") {
            throw new BCAPI.Components.Exceptions.BadArgumentException("No securityCfg argument provided.",
                            "securityCfg");
        }

        if (!securityCfg.siteUrl) {
            throw new BCAPI.Components.Exceptions.BadArgumentException("securityCfg argument does not contain a site.",
                            "securityCfg.siteUrl");
        }

        if (!securityCfg.accessToken) {
            throw new BCAPI.Components.Exceptions.BadArgumentException("securityCfg argument does not contain an access token.",
                            "securityCfg.accessToken");
        }

        BCAPI.Security._securityCfg = securityCfg;
    };

    /**
     * This method provides a method for obtaining the bc configuration for this session. If there was a configure
     * method explicitly invoked then that configuration will be returned. Otherwise, an implicit bc configuration will
     * be built based on the current url and access token cookie.
     *
     * @public
     * @method
     * @name getBcConfig
     * @memberof BCAPI.Security
     * @param {Window} wnd the window object which must be used when implicitly building a configuration. If this is not specified current window will be used.
     * @returns {undefined} no result.
     */
    BCAPI.Security.getBcConfig = BCAPI.Security.getBcConfig || function(wnd) {
        if (BCAPI.Security._securityCfg) {
            return BCAPI.Security._securityCfg;
        }

        wnd = wnd || window;

        var siteUrl = wnd.location.protocol + "//" + wnd.location.hostname,
            accessToken = $.cookie("access_token");

        BCAPI.Security._securityCfg = {
            "siteUrl": siteUrl,
            "accessToken": accessToken
        };

        return BCAPI.Security._securityCfg;
    };

    /**
     * This method provides a simple way to obtain the current bc security context.
     *
     * @public
     * @method
     * @name getBcSecurity
     * @memberof BCAPI.Security
     * @returns {Promise} A promise which will be resolved with the bc security context for the current session. Internally
     * it uses a cache so that all subsequent calls to this method work really fast.
     */
    BCAPI.Security.getBcSecurity = BCAPI.Security.getBcSecurity || function() {
        if (BCAPI.Security.__bcSecurityCtxLoader) {
            return BCAPI.Security.__bcSecurityCtxLoader;
        }

        var securityCtxLoader = $.Deferred();
        
        if (BCAPI.Security._bcSecurityCtx) {
            setTimeout(function() {
                securityCtxLoader.resolve(BCAPI.Security._bcSecurityCtx);
            });

            return securityCtxLoader.promise();
        }

        var meDataSource = document.createElement("bc-api"),
            securityCfg = BCAPI.Security.getBcConfig();

        meDataSource.configure({
            "bcConfig": securityCfg,
            "apiName": "users",
            "apiVersion": "v3",
            "resourceId": "me",
            "fields": "id,firstName,lastName"
        });

        var response = meDataSource.list();

        response.then(function(userData) {
            var user = new BCAPI.Security.User(userData),
                accessToken = new BCAPI.Security.AccessToken({
                    "userId": user.userId,
                    "user": user,
                    "token": securityCfg.accessToken
                }),
                securityCtx = new BCAPI.Security.BcSecurityContext(accessToken, user, securityCfg);

            BCAPI.Security._bcSecurityCtx = securityCtx;

            securityCtxLoader.resolve(securityCtx);

            BCAPI.Security.__bcSecurityCtxLoader = undefined;
        });

        BCAPI.Security.__bcSecurityCtxLoader = securityCtxLoader.promise();

        return BCAPI.Security.__bcSecurityCtxLoader;
    };
})(jQuery);