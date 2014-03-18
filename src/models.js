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
