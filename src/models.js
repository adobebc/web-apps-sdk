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
     *	}
     * });
     */
    BCAPI.Models.Model = Backbone.Model.extend({
    	headers: function() {
    		return {
    			"Authorization": BCAPI.Helpers.Site.getSiteToken()
    		};
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