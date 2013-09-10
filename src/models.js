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
    	 * @instance
    	 * @memberOf BCAPI.Models.Model
    	 * @returns {Object} A list of headers appended to ajax calls.
    	 */
    	headers: function() {
    		return {
    			"Authorization": BCAPI.Helper.Site.getSiteToken()
    		};
    	},
    	/**
    	 * This method automatically builds absolute entry point url of the model.
    	 *
    	 * @method
    	 * @instance
    	 * @returns {string} An absolute entry point API.
    	 * @memberOf BCAPI.Models.Model
    	 */
    	urlRoot: function() {
    		var url = BCAPI.Helper.Site.getRootUrl(),
    			endpoint = this.endpoint();
    		
    		if(endpoint.charAt(0) !== "/") {
    			endpoint = '/' + endpoint;
    		} 
    		
    		return url + endpoint;
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
    	save: function(handlers) {
    		return Backbone.Model.prototype.save.call(this, this.attributes, handlers);
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

    		return Backbone.Model.prototype.sync.call(this, method, model, options);
            // TODO: Promises should work
//            return xhr.then(function() { return this; }).promise(xhr);
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
    BCAPI.Models.Collection = Backbone.Paginator.requestPager.extend({
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
    		options.headers = new this.model().headers();
    		
    		this._limit = options.limit;
    		this._skip = options.skip;
    		
    		if(options.where) {
    			this._where = JSON.stringify(options.where);
    		}
    		
    		this._order = options.order;    		
    		
    		return Backbone.Paginator.requestPager.prototype.fetch.call(this, options);
    	},
    	/**
    	 * This method returns the root url of this collection. It internally uses the model
    	 * assigned to this collection for detecting the absolute entry point.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.Collection
    	 */
    	url: function(model) {
    		model = model || (new this.model());
    		
    		return model.urlRoot();
    	},
    	/**
    	 * This property defines default value for defining core paginator behavior.
    	 * 
    	 * @instance
    	 * @memberOf BCAPI.Models.Collection
    	 */
    	paginator_core: {
    		type: "GET",
    		dataType: "json",    		
    		url: function() {
    			var urlWithParams = [this.url(), "?"];
    			
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
    		}
    	},
    	/**
    	 * This property defines default values for how this paginated collection works.
    	 * 
    	 * @instance
    	 * @memberOf BCAPI.Models.Collection
    	 */
    	paginator_ui: {
    		firstPage: BCAPI.Config.Pagination.lowestPage
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