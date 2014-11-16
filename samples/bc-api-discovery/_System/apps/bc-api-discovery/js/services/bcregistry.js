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

(function(app) {
	/**
	 * @constructor
	 * @descriptor
	 * This service implements the http client for loading all BC registered resources and providing them
	 * to the application.
	 */
	function BcRegistryService($http, $q, configService) {
		this._httpService = $http;
		this._$q = $q;
		this._configService = configService;

		this._cachedRegistry = undefined;
	};

	/**
	 * @public
	 * @constant
	 * @description
	 * This constant holds the BC APIs registry url.
	 */
	BcRegistryService.prototype.REGISTRY_URL = "/webresources/api/v3/sites/current/registry";

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

		if(this._cachedRegistry) {
			setTimeout(function() {
				result.resolve(self._cachedRegistry);
			}, 0);
		}
		else {
			this._loadBcRegistry().then(function(response) {
				self._cachedRegistry = response.data;
				result.resolve(self._cachedRegistry);
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
		var rootUrl = ["https://", this._configService.api.host, this.REGISTRY_URL].join("");

		return this._httpService({
			"url": rootUrl,
			"method": "GET",
			"headers": {
				"Accept": "application/json",
				"Authorization": this._configService.api.accessToken
			}
		});
	};

	app.service("BcRegistryService", ["$http", "$q", "ConfigService", BcRegistryService]);
})(DiscoveryApp);