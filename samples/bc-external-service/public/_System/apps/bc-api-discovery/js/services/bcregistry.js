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
	 * @constructor
	 * @descriptor
	 * This service implements the http client for loading all BC registered resources and providing them
	 * to the application.
	 */
	function BcRegistryService($http, $q, $timeout, configService, globalLoadingService, errorService) {
		this._httpService = $http;
		this._$q = $q;
		this._$timeout = $timeout;

		this._configService = configService;
		this._globalLoadingService = globalLoadingService;
		this._errorService = errorService;

		this._cachedRegistry = undefined;
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method loads BC and BC Support registries for webresources, unifies them and return the final result through a promise.
	 */
	BcRegistryService.prototype.getRegistry = function() {
		var result = this._$q.defer(),
			self = this;

		this._globalLoadingService.setLoading(true);

		if(this._cachedRegistry) {
			this._$timeout(function() {
				self._globalLoadingService.setLoading(false);
				result.resolve(self._cachedRegistry);
			}, 0);
		}
		else {
			this._loadBcRegistry().then(
				function(response) {
					self._cachedRegistry = response.data;
					result.resolve(self._cachedRegistry);
					self._globalLoadingService.setLoading(false);
				},
				function(errorResponse) {
					self._errorService.logError(errorResponse);
				});
		}

		return result.promise;
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @returns {promise} A promise which can be used to determine when BC Registry async operation is resolved.
	 * @description
	 * This method fetches bc registry and stores it locally for future use.
	 */
	BcRegistryService.prototype._loadBcRegistry = function() {
		var rootUrl = [];

		if(this._configService.api.protocol && this._configService.api.host) {
			rootUrl.push(this._configService.api.protocol);
			rootUrl.push("://")
			rootUrl.push(this._configService.api.host);
		}

		rootUrl.push(this._configService.bcRegistryUrl);

		rootUrl = rootUrl.join("");

		return this._httpService({
			"url": rootUrl,
			"method": "GET",
			"headers": {
				"Accept": "application/json",
				"Authorization": this._configService.api.accessToken
			}
		});
	};

	app.service("BcRegistryService", ["$http", "$q", "$timeout", "ConfigService", "GlobalLoadingService",
										"ErrorHandlingDataService", BcRegistryService]);
})(DiscoveryApp);