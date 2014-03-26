/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
(function($) {
    'use strict';

    /**
     * This disables jQuery ajax internal cache.
     */
    $.ajaxSetup({ cache: false });
    
    /**
     * This forces jQuery cookie plugin to set cookie values as received (no urlencode applied). 
     */
    $.cookie.raw = true;
    
    /**
     * @namespace BCAPI
     */
    window.BCAPI = {};

})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
    BCAPI.Helper.Site =  {};

    /**
     * Returns the access_token from either the URL fragment or a session cookie (if it was read from URL and set before in cookie for short term reference)
     * 
     * @returns {string} The access_token
     */
    BCAPI.Helper.Site.getAccessToken = function() {        
        if (!$.cookie) {
            return $.error('Include jQuery.cookie or override BCAPI.Helper.Site.getAccessToken with your own implementation.');
        }

        var location = BCAPI.Helper.Http.getCurrentLocation();
        var parameters = BCAPI.Helper.Http.getHashFragments(location);
        var paramAccessToken = parameters['access_token'];
        var expiresIn = parseInt(parameters['expires_in'] || 
        									      "" + BCAPI.Config.ACCESS_TOKEN_DEFAULT_EXPIRATION);
        
        if (paramAccessToken){
            var expiryDate = new Date(Date.now());

            expiryDate.setTime(expiryDate.getTime() + expiresIn * 1000);
            
            var cookieOptions = {
            		"expires": expiryDate,
            		"path": "/",
            		"secure": true
            };
            $.cookie('access_token', paramAccessToken, cookieOptions);           
        }

        return paramAccessToken || $.cookie('access_token');
	};

    /**
     * This method obtains secure url required for API calls. It uses the current host from location
     * in order to detect prefix of APIs url. We can do this because BC api js sdk is always used 
     * with 3rd party applications served from a separated domain. 
     * 
     * @returns {string} API secure url.
     */
    BCAPI.Helper.Site.getRootUrl = function(wnd) {
    	wnd = wnd || window;
    	
        var url = [wnd.location.protocol, "//", wnd.location.hostname].join("");
        
        return url;
    };

    /**
     * @returns {string}
     */
    BCAPI.Helper.Site.getSiteId = function() {
        return 'current';
    };

    /**
     * Http utility functions.
     * Override with your own version if needed.
     *
     * @namespace BCAPI.Helper.Http
     */
    BCAPI.Helper.Http =  {};

    /**
     * Utility function to parse and decode parameters from a search or hash location part
     * 
     * @returns {object}
     * @example
     * // returns an object with key value pairs for each parameter (parameterName: parameterValue)
     * result = BCAPI.Helper.Http.getDecodedParameters("access_token=febf7b6a027b49239331cb6fa144&token_type=example")
     * // result = {"access_token": "febf7b6a027b49239331cb6fa144", "token_type": "example"}
     */
    BCAPI.Helper.Http.getDecodedParameters = function(paramString) {
        var params = paramString.split('&'),
        		decodedParams = {};
        
        if (params === "") { 
        	return {}; 
        }
        
	    for (var i = 0; i < params.length; i += 1) {            
	        var param = params[i],
	            	firstEqual = param.indexOf("=");
	        
	        p = [];
	        
	        if(firstEqual > -1) {
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
        if (typeof location.search == undefined || location.search.length == 0){
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
        if (typeof location.hash == undefined || location.hash.length == 0){
            return {};
        }
        return BCAPI.Helper.Http.getDecodedParameters(location.hash.substr(1));
    };

    /**
     * Helper function to isolate getting actual location, for unit testing
     * @returns {string}
     */
    BCAPI.Helper.Http.getCurrentLocation = function() {
        return window.location;
    };

})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
     * 	defaults: {
     * 		firstName: "John",
     * 		lastName: "Doe"
     *	},
     *	endpoint: function() {
     *		return "/api/v2/persons";
     *	}
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
            var url = BCAPI.Helper.Site.getRootUrl(),
                modelEndpoint = modelEndpoint || this.endpoint();

            if(modelEndpoint.charAt(0) !== "/") {
                modelEndpoint = '/' + modelEndpoint;
            } 
            
            return url + modelEndpoint;
    	},
    	/**
    	 * This method change default Backbone save behaviour in order to simplify save invocation.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.Model
    	 * @example
    	 * var model = new PersonModel();
    	 * model.save({
    	 * 	success: function(model, response) {
    	 * 		// handle success logic in here
    	 * 	}
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
    	 * @example
    	 * var model = new PersonModel({id: 1});
    	 * model.destroy({
    	 * 	success: function() {
    	 * 		// do something when delete is successful.
    	 * 	}
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
    		
    		for(var headerKey in customHeaders) {
    			options.headers[headerKey] = customHeaders[headerKey];
    		}

    		var xhr = Backbone.Model.prototype.sync.call(this, method, model, options);
    		
    		return xhr.then(function() { return this; }).promise(xhr);
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
     * 	model: BCAPI.Examples.Person
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
    		
    		if(options.where) {
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
    	 */
    	url: function() {    		
			var urlWithParams = [this.urlRoot(), "?"];
			
			for(var key in this.server_api) {
				var val = this.server_api[key].apply(this);
				
				if(val === undefined) {
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
    	server_api: {
    		"limit": function() { return this._limit || this._defaultLimit; },
    		"skip": function() { return this._skip || this._defaultSkip; },
    		"where": function() { return this._where; },
    		"order": function() { return this._order; }
    	},
    	parse: function(response) {
    		return response.items;
    	}
    });
})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
         */
        endpoint: function() {
            return '/api/v2/admin/sites/current/categories';
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
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
(function($) {
    'use strict';

    function getParent(x) {
        return x == '/' ? BCAPI.Models.FileSystem.Root : new BCAPI.Models.FileSystem.Folder(x);
    }

    var FILE_REGEX = /^[^\&\%]+$/;

    //common model for files & folders
    var Entity = BCAPI.Models.Model.extend({
        'idAttribute': 'path',

        constructor: function(a1, a2, a3) {
            var attributes, options, initialProps = {};
            if (typeof a1 === 'string') {
                attributes = a2;
                options = a3;
                var path = $.trim(a1);
                if (path == '/') {
                    throw new Error('Cannot instantiate the "/" folder like this. Use BCAPI.Models.FileSystem.Root instead');
                } 
                var o = splitPath(path);
                initialProps.parent =  getParent(o.parent);
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
            var model = this;
            this.on('change:parent sync', function() {
                model._refreshPath();
            });
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/storage';
        },
        
        url: function() {
            return this.contentUrl() + '?meta';
        },

        /**
         * Returns the url where the content can be accessed.
         * @return {string} The URL of the resource
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        contentUrl: function() {
            var p = this.get('path');
            if (p[0] == '/') {
                p.substring(1);
            }
            return this.urlRoot() + p;
        },

        validate: function(attr) {
            if (!attr.name || typeof attr.name !== 'string' || !FILE_REGEX.test(attr.name)) {
                return 'Invalid name for file: [' + attr.name + ']';
            }
            if (!attr.path || attr.path === '/') {
                return 'Invalid path for file: [' + attr.path + ']';
            }
        },

        parse: function(result) {
            //converting to a date object instead of the date string
            var dateStr = result.lastModified;
            result.lastModified = new Date(dateStr);
            return result;
        },

        toJSON: function() {
            //only name should be persisted. Other attributes are calculated
            return _.pick(this.attributes, 'name');
        },

        //recomputes the path attribute. Useful to call when parent or name have changed
        _refreshPath: function() {
            this.set('path', mkFilePath(this.get('parent').get('path'), this.get('name')));
        }
    });

    function mkFilePath(dirPath, name) {
        if (dirPath[dirPath.length - 1] == '/') {
            return dirPath + name;
        } else {
            return dirPath + '/' + name;
        }
    }

    function splitPath(path) {
        var parent, name,
            index = path.lastIndexOf('/');
        if (index < 0) {
            name = path;
        } else {
            parent = path.substring(0, index);
            name = path.substring(index + 1);
        }
        if (!parent) {
            parent = '/';
        }
        return {
            'parent': parent,
            'name': name
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
                'contentType': 'application/octet-stream',
                'type': 'PUT',
                'data': data,
                'processData': false,
                'headers': this.headers()
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
                'type': 'GET',
                'headers': this.headers()
            });
        },


        initialize: function() {
            this.set('type', 'file');
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
     *         // also works: var isFile = entity.get('type') === 'file';
     *         if (isFile) {
     *             console.log('File ' + file.get('name') + ' updated at ' + file.get('lastModified'));
     *         } else {
     *             console.log('Folder ' + folder.get('name'));
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
            var fullAttributes = _.extend({'parent': this, 'name': name}, attributes);
            return new BCAPI.Models.FileSystem.File(fullAttributes, options);
        },

        initialize: function() {
            this.set('type', 'folder');
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
            return $.ajax(this.contentUrl() + '?type=folder', {
                'type': 'PUT',
                'processData': false,
                'headers': this.headers()
            });
        },

        parse: function(result) {
            var items = Entity.prototype.parse.call(this, result);
            var parent = this;
            var models = _.map(items.contents, function(obj) {
                obj.parent = parent;
                if (obj.type === 'file') {
                    return new BCAPI.Models.FileSystem.File(obj);
                } else if (obj.type === 'folder') {
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
                'path': '/',
                'name': '',
                parent: null
            });
        },

        validate: function() { },

        save: function() {
            throw new Error('Operation not supported');
        },

        destroy: function() {
            throw new Error('Operation not supported');
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

;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
     *
     * apps.each(function(webApp) {
	 * 		// display logic
	 * });
     * ```
     *
     * ## Create webapp
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
	 * 		"name": "Test app"
	 * });
     *
     * app.save({
	 * 		success: function(webAppItem) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItem, xhr) {
	 * 			// handle errors
	 * 		}
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
	 * 	success: function(webAppItem, response) {
	 * 		// handle success here.
	 *  },
	 *  error: function(webAppItem, xhr, options) {
	 * 		// handle error scenario.
	 *  }
	 * });
     * ```
     *
     * ## Supported attributes
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
	 *	templateId: -1,
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
        idAttribute: 'name',

        /**
         * Set tot true if you want to save or delete an existing item before fetching it
         *
         * @type {boolean}
         * @memberOf WebApp
         */
        isNotNew: null,

        isNew: function() {
            return this.isNotNew ? false : !this.get('id');
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/webapps';
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
     *  	webapps.each(function(webapp) {
     *  		// no custom fields are retrieved.
     *  	});
     *  }
     *  
     * @example
     * // extract and fetch webap details from a fetched collection (by webapp id).
     * var webappId = 1,
     *		webapp = appCollection.get(webappId);
     *
     * webapp.fetch({
     * 	success: function(webapp) {
     * 		// webapp is now fully loaded.
     *  }
     * });
     *
     * @example
     * // extract and fetch webapp details from fetched collection (by webapp index)
     * var idx = 1,
     * 	    webapp = appCollection.at(idx);
     * 
     * webapp.fetch({
     * 	success: function(webapp) {
     * 		// webapp is now fully loaded.
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
    	 * @returns A list of web app items.
    	 * @memberOf BCAPI.Models.WebApp.AppCollection 
         */
        parse: function(response) {
        	var self = this;
        	
        	response = BCAPI.Models.Collection.prototype.parse.call(this, response);
        	
        	return response;
        }
    });
})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
         */
        toJSON: function(){
            return this.get('items');
        },

        /**
         * This method performs the save to the server
         * It is overwritten here to always force a PUT operation on the endpoint
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return  BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
(function($) {
	"use strict";

    var endpointGenerator = function(webappName) {
        return "/api/v2/admin/sites/current/webapps/" + webappName + "/fields";
    }

	/**
	 * This class provides support for custom fields description belonging to {@link BCAPI.Models.WebApp.App}
	 * 
	 * ## Create a new custom field
	 * 
	 * ```javascript
	 * var customField = new BCAPI.Models.WebApp.CustomField("Test webapp", {
     *  "id": 1,
     *	"name": "Part code",
     *	"type": "DataSource",
     *	"listItems": null,
     *	"dataSource": "Part Codes",
     *	"required": false
	 * }, true);
	 * 
	 * customField.save({
	 * 	success: function(fieldModel) {
	 * 		// do something on success.
	 * 	}
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

            if(this._isNew && (_.isUndefined(attributes) || _.isUndefined(attributes["id"]))) {
                throw new Error("The id for the custom field must be specified.");
            }

            var id = Number(attributes["id"]);
            if(!_.isNumber(id) || _.isNaN(id) || id <= 0) {
                throw new Error("The id for the custom field must be a positive number.");
            }
			
			this._webappName = webappName;
			this.set({webapp: new BCAPI.Models.WebApp.App({name: webappName})});
		},
		/**
		 * This method returns the endpoint for custom fields api.
		 * 
		 * @method
		 * @instance
		 * @memberOf BCAPI.Models.WebApp.CustomField
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
    	 */
    	toJSON: function(options) {
    		var result = BCAPI.Models.Model.prototype.toJSON.call(this, options);
    		
    		delete result["webapp"];
    		
    		return result;
    	},
        /**
         * This method is overriden in order to use the correct HTTP verb on creation and update
         * since the id of the item is always passed.
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
    	 * @returns A list of web app custom fields.
    	 * @memberOf BCAPI.Models.WebApp.CustomField 
    	 */
    	parse: function(response) {
    		response = BCAPI.Models.Collection.prototype.parse.call(this, response);
    		
    		var fields = [],
    			self = this;
    		
    		_.each(response, function(field) {
    			fields.push(new self.model(self._webappName, field, false));
    		});
    		
    		return fields;
    	}
	});
})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
	 * 		skip: 10, limit: 100,
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * 
	 * items.each(function(webAppItem) {
	 * 		// display logic
	 * });
	 * ```
	 *
	 * ## Filtering items
	 *
	 * ```javascript 
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
	 * items.fetch({ 	
	 * 		where: {"name": ""Web app item new"},
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ```
	 * 
	 * ## Ordering items
	 * 
	 * ```javascript 
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
	 * items.fetch({
	 * 		order: "-name",
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ```
	 * 
	 * ## All in one usage
	 * 
	 * ```javascript 
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
	 * items.fetch({
	 * 		skip: 10, limit: 100,
	 * 		where: {"name": ""Web app item new"},
	 * 		order: "-name",
     *		success: function(webAppItems) {
	 * 			webAppItems.each(function(webAppItem) {
	 *		 		// display logic
	 * 			});
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ``` 
	 *  
	 * ## Create item
	 * 
	 * ```javascript
	 * var item = new BCAPI.Models.WebApp.Item("Test webapp", {
	 * 		"name": "Test item"
	 * });
	 * 
	 * var response = item.save({
	 * 		success: function(webAppItem) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItem, xhr) {
	 * 			// handle errors
	 * 		}
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
	 * 	success: function(webAppItem, response) {
	 * 		// handle success here.
	 *  },
	 *  error: function(webAppItem, xhr, options) {
	 * 		// handle error scenario.
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
	 *	"name": "Item7",
	 *	"weight": 7,
	 *	"releaseDate": "2013-01-30",
	 *	"expiryDate": "9999-01-01",
	 *	"enabled": true,
	 *	"slug": "item7",
	 *	"description": "item7 description",
	 *	"roleId": null,
	 *	"submittedBy": -1,
	 *	"templateId": 123,
	 *	"address": "item7_address",
	 *	"city": "item7_city",
	 *	"state": "item7_state",
	 *	"zipCode": "000007",
	 *	"country": "US",
	 *	"fields": {
	 *	    "field_string_required": "item7_field1_value",
	 *	    "field2_string_optional": "item7_field2_value",
	 *	    "field3_number": 7,
	 *	    "field4_dateTime": "2012-01-20",
     *	    "field5_list": "item1"
	 *	}
     * });
     */
    BCAPI.Models.WebApp.Item = BCAPI.Models.Model.extend({
    	constructor: function(webappName, attributes, options) {
    		BCAPI.Models.Model.call(this, attributes, options);
    		
    		this._webappName = webappName;
    		this.set({webapp: new BCAPI.Models.WebApp.App({name: webappName})});
    	},
    	/**
    	 * This method returns the correct endpoint for the web app items.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.WebApp.Item
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
    	 */
    	toJSON: function(options) {
    		var result = BCAPI.Models.Model.prototype.toJSON.call(this, options);
    		
    		delete result["webapp"];
    		
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
     * 	success: function(items) {
     * 		// handle items (only system fields available in each item).
     * 
     * 		items.each(function(item) {
     * 			item.fetch({
     * 				success: function(itemDetails) {
     * 					// do something with item details.
     * 				}
     * 			});
     * 		});
     * 	}
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
    	 * @returns A list of web app items.
    	 * @memberOf BCAPI.Models.WebApp.ItemCollection 
    	 */
    	parse: function(response) {
    		response = BCAPI.Models.Collection.prototype.parse.call(this, response);
    		
    		var items = [],
    			self = this;
    		
    		_.each(response, function(item) {
    			items.push(new self.model(self.webappName, item));
    		});
    		
    		return items;
    	}
    });
})(jQuery);
;/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
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
     * itemCategories.set(items, [1,2,3,4]);
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
         */
        toJSON: function(){
            return this.get('items');
        },

        /**
         * This method performs the save to the server
         * It is overwritten here to always force a PUT operation on the endpoint
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.ItemCategory
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return  BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);
