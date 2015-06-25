/* 
* 
* Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

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

(function(app) {
	/**
	 * @public
	 * @constructor
	 * @description
	 * This class provides a factory which can be used to obtain BC apis proxy instances 
	 * able to interact with a specific BC api.
	 * @example
	 * var productsProxy = bcApiFactory.getProxy("products").then(function(proxy) {
	 * 	proxy.list().then(response) {
	 *		console.log(response.data);
	 *	}
	 * });
	 */
	function BcApiFactory($http, $q, registryService, configService, globalLoadingService, errorService) {
		this._$http = $http;
		this._$q = $q;
		this._registryService = registryService;
		this._configService = configService;
		this._globalLoadingService = globalLoadingService;
		this._errorService = errorService;

		console.log("BC Api Factory service initialized.");
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to obtain a proxy binded to the specified resource name which can be used
	 * to execute API supported operations.
	 */
	BcApiFactory.prototype.getProxy = function(resourceName, version) {
		var response = this._$q.defer(),
			self = this;

		this._registryService.getRegistry().then(function(registry) {
			if(!registry[resourceName] || !registry[resourceName][version]) {
				var msg = ["Resource ", resourceName, ", version ", version, " is not registered."].join("");
				
				self._errorService.logError(msg);

				return;
			}

			var resourceDescriptor = registry[resourceName][version],
				proxy = new BcApiProxy(self._$http, self._configService, resourceName, version, registry, 
										resourceDescriptor, self._globalLoadingService, self._errorService);

			response.resolve(proxy);
		});

		return response.promise;
	};

	app.service("BcApiFactory", ["$http", "$q", "BcRegistryService", "ConfigService", "GlobalLoadingService", 
								"ErrorHandlingDataService", BcApiFactory]);

	/**
	 * @public
	 * @constructor
	 * @description
	 * This class provide a proxy binded to a specific API which can be used to invoke various
	 * supported operations.
	 */
	function BcApiProxy($http, configService, resourceName, version, registry, resourceDescriptor,
						globalLoadingService, errorService) {
		this._$http = $http;
		this._configService = configService;
		this._globalLoadingService = globalLoadingService;
		this._errorService = errorService;		
		
		this.resourceName = resourceName;
		this.resourceVersion = version;
		this.registry = registry;
		this.resourceDescriptor = resourceDescriptor;
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to obtain the subresource descriptor starting from subresource name. 
	 */
	BcApiProxy.prototype.getSubresourceDescriptor = function(subresourceName) {
		var subresourceAttrs = this.resourceDescriptor.fields.manyRelation[subresourceName],
			subresourceVersion = subresourceAttrs.version,
			resourceName = subresourceAttrs.type;

		return this.registry[resourceName][subresourceVersion];
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to list all records from the current proxy which match the given filter
	 * criteria.
	 */
	BcApiProxy.prototype.list = function(where, limits, order) {
		var url = this._getApiUrl(),
			self = this;

		where = where || {};
		limits = this._getDefaultLimits(limits);
		order = this._getDefaultOrder(order);

		this._globalLoadingService.setLoading(true);

		var response = this._$http({
			"url": url,
			"method": "GET",
			"params": {	
				"where": where,
			   	"skip": limits.skip,
				"limit": limits.limit,
				"order": order
			},
			"headers": {
				"Accept": "application/json",
				"Authorization": this._configService.api.accessToken
			}
		});

		response.then(function() {
			self._globalLoadingService.setLoading(false);
		});

		return response;
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to get an individual item from the current proxy which matches the given
	 * filter criteria.
	 */
	BcApiProxy.prototype.fetch = function(where, resourceId) {
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to create a new resource with the given resource data.	 
	 */
	BcApiProxy.prototype.create = function(resourceData) {

	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description	
	 * This method is used to update an existing resource identified by resourceId
	 * with the given resource data.
	 */
	BcApiProxy.prototype.update = function(resourceId, resourceData) {
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to delete an existing resource.
	 */
	BcApiProxy.prototype.delete = function(resourceId) {
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to fetch subresources for an existing resource identified by the given
	 * resource identifier.
	 */
	BcApiProxy.prototype.getSubresources = function(resourceId, subresourceName, where, limits, order) {
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to create new subresources for an existing resource identified by the given
	 * resource identifier.
	 */
	BcApiProxy.prototype.createSubresources = function(resourceid, subresourceName, subresourcesBody) {
	};


	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to delete subresources for an existing resource identified by the given
	 * resource identifier. Items is an array of unique identifiers for the given subresource name.
	 */
	BcApiProxy.prototype.deleteSubresources = function(resourceId, subresourceName, items) {
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method is responsible for calculating default limits for a given limits object. It sets
	 * skip and limit to default values if they are not specified in the given object.
	 */
	BcApiProxy.prototype._getDefaultLimits = function(limits) {
		limits = limits || {};
		limits.skip = limits.skip || this._configService.limits.skip;
		limits.limit = limits.limit || this._configService.limits.limit;

		return limits;
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method obtains default order criteria if the given order is not defined. Otherwise it returns
	 * the given order criteria.
	 */	
	BcApiProxy.prototype._getDefaultOrder = function(order) {
		if(order) {
			return order;
		}

		return this.getResourceIdFieldName();
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method returns the first primary key field name which is not siteId.
	 */
	BcApiProxy.prototype.getResourceIdFieldName = function(resourceDescriptor) {
		resourceDescriptor = resourceDescriptor || this.resourceDescriptor;

		for(var idName in resourceDescriptor.fields.identifier) {
			if(idName == "siteId") {
				continue;
			}

			return idName;
		}
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method builds an api url where requests can be done.
	 */
	BcApiProxy.prototype._getApiUrl = function(resourceId, subresourceName) {
		var url = [];

		if(this._configService.api.protocol && this._configService.api.host) {
			url.push(this._configService.api.protocol);
			url.push("://")
			url.push(this._configService.api.host);
		}

		url.push(this._configService.bcWebResourcesApp);
		url.push("/api/");
		url.push(this.resourceVersion);
		url.push("/sites/current/");
		url.push(this.resourceName);

		if(resourceId) {
			url.push("/" + resourceId);
		}

		if(resourceId && subresourceName) {
			url.push("/" + subresourceName);
		}

		return url.join("");
	};
})(DiscoveryApp);