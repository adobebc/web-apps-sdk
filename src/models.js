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
    		options.headers = new this.model().headers();
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
    	url: function(model) {
    		model = model || (new this.model());
    		
			var urlWithParams = [model.urlRoot(), "?"];
			
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
    	},
    	/**
    	 * This helper method allows easily fetching of related resources for each item from this collection.
    	 *
    	 * @method
    	 * @instance
    	 * @param {String} resourceField The attribute name which holds fetched collection into each model item.
    	 * @param {function} resourceBuilder A function which can give a resource collection instance.
    	 * @param {Boolean} eagerFetch A boolean flag used for deciding if the relation must be eagerly fetched.
		 * @param {Object} options The options received when fetching the original collection.
    	 * @param {function} options.successHandler Collection success handler we want to execute once every relation is fetched.
    	 * @memberOf BCAPI.Models.Collection
    	 * 
    	 * @example
    	 * // sample fetch implementation for webapp collection. 
    	 * fetch: function(options) {
         *	options = options || {};
         *
       	 *	var eagerFetch = options.fetchFields;
         *	
         *	function itemsBuilder(webapp) {
         *		return new BCAPI.Models.WebApp.CustomFieldCollection(webapp.get("name"));
         *	}
         *	
         *	return this._fetchRelation("fields", itemsBuilder, eagerFetch, options);
         * }
    	 */
    	_fetchRelation: function(resourceField, resourceBuilder, eagerFetch, options) {
        	options = options || {};
        	
        	var dummyHandler = function() {},
        		oldSuccess = options.success || dummyHandler,
        		oldError = options.error || dummyHandler,
        		self = this;
        	
        	options.success = function(collection, xhr, options) {
        		var currFetchedRelations = 0;
        		
        		if(collection.length > 0 && eagerFetch) {
        			self._relationFetchPending++;
        		}
        		
        		collection.each(function(item) {
        			var relationCollection = resourceBuilder(item),
        				relationFields = {};
        			
        			relationFields[resourceField] = [];
        			
        			item.set(relationFields);
        			
        			if(!eagerFetch) {
        				return oldSuccess(collection, xhr, options);
        			}
        			
        			relationCollection.fetch({
        				success: function(relationItems) {
        					relationFields = {};
        					relationFields[resourceField] = relationItems;
        					
        					item.set(relationFields);
        					
        					if(++currFetchedRelations == collection.length) {
        						self._markFetchRelationComplete(xhr, options, oldSuccess);
        					}
        				},
        				error: function(relationItems, xhr) {
        					self._markFetchRelationError(resourceField, xhr, options, oldError);
        				}
        			});
        		});
        	};
        	
        	return BCAPI.Models.Collection.prototype.fetch.call(this, options);
    	},
    	/**
    	 * This method marks a fetch relation request as completed. When all fetch actions are completed
    	 * success handler is invoked.
    	 * 
    	 * @method
    	 * @instance
    	 * @param {Object} xhr XHR object used to fetch the current collection.
    	 * @param {Object} options XHR options used for collection fetch ajax call. 
    	 * @param {function} successHandler The success handler which must be executed
    	 * @memberOf BCAPI.Models.Collection
    	 */
    	_markFetchRelationComplete: function(xhr, options, successHandler) {
    		if(--this._relationFetchPending > 0) {
    			return;
    		}
    		
    		return successHandler(this, xhr, options);
    	},
    	/**
    	 * This method marks a fetched relation request as an error and invoke registered error handler.
    	 * 
    	 * @param {String} resourceField Resource field identifier for the collection fetch request which failed.
    	 * @param {Object} xhr XHR object used for fetch ajax request.
    	 * @param {Object} options The options used for ajax request. 
    	 * @param {function} errorHandler The error handler which must be invoked for the current xhr object.
    	 */
    	_markFetchRelationError: function(resourceField, xhr, options, errorHandler) {
    		var errMsg = ["Collection", resourceField, "fetch action failed:", xhr.responseText];
    		
    		xhr.responseText = errMsg.join(" ");
    		
    		return errorHandler(this, xhr, options);
    	}
    });
})(jQuery);