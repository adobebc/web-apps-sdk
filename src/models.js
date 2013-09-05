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
    	 * @returns {String} the model API entry point.
    	 * @throws An error if endpoint method is not overriden in concrete models.
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
    	 * @returns A list of headers apppended to ajax calls.
    	 */
    	headers: function() {
    		return {
    			"Authorization": BCAPI.Helper.Site.getSiteToken()
    		};
    	},
    	/**
    	 * This method automatically builds absolute url of the model.
    	 * 
    	 * @returns An absolute API url.
    	 */
    	url: function() {
    		var url = BCAPI.Helper.Site.getRootUrl(),
    			endpoint = this.endpoint();
    		
    		if(endpoint.charAt(0) == "/") {
    			endpoint = endpoint.substring(1, endpoint.length);
    		} 
    		
    		return url + endpoint;
    	},   	
    	/**
    	 * Sync method is invoked automatically when user tries to create / update a model. It automatically 
    	 * appends the custom headers returned by {@link BCAPI.Models.Model.headers} method.
    	 * 
    	 * @param {String} method Http method used to persist the state of the current model. 
    	 * @param {BCAPI.Models.Model} model The current model to persist.
    	 * @param {Object} options Additional options which influence how http call will be done.
    	 */
    	sync: function(method, model, options) {
    		var customHeaders = this.headers();
    		
    		options.headers = options.headers || {};
    		
    		for(var headerKey in customHeaders) {
    			options.headers[headerKey] = customHeaders[headerKey];
    		}
    		
    		Backbone.Model.prototype.sync(method, model, options);
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
    	fetch: function(options) {
    		options.type = options.type || "GET";
    		
    		this.limit = options.limit;
    		this.skip = options.skip;
    		this.where = options.where;
    		this.filter = options.filter;
    		
    		Backbone.Paginator.requestPager.prototype.fetch.apply(this, options);
    	},
    	paginator_core: {
    		dataType: "json",
        	url: "https://www.myexample.com/api/v2/"
    	},
    	paginator_ui: {
        	firstPage: 0,
        	currentPage: 0,
        	perPage: 100    		
    	},
    	server_api: {
    		"where": function() { return JSON.stringify(this.where || {}); },
    		"limit": function() { return this.limit || this.perPage; },
    		"skip": function() { return this.skip || (this.currentPage * this.perPage); },
    		"order": function() { return this.order || "name"; }
    	}
    });
})(jQuery);