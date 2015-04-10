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


	/**
	 * bc api v3 config
	 * @type {string}
	 */
	Config.defaultAccessToken = "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdJbnFCeU9yOVhFb0g0VURuNmZJUHVDcXRzUldValFjYlZXZjRiWEtOemgvTVlTaEk1ZkNrWGx6dnVCdE9wNFhENW01UUhFcm5ZcEIxUklKQVNKWnQ3RmMySXVWWFBMK0M0ZHNBVUpLcWUwbXhRb2txbWsydlIrU2N2NjV6b3RXY0s0bXpjeVBSR3BBZGVSWlFHcDE0ZWdodFdaQzJVYzNiWVFpQnpiUFAxejJacTg3bGFJTGwzZkdmYzkvdnlKU09FRFppUGk5NnJSb2dLQlBYa0c5c3dSS2JiaGNaYmlKM2xwV2lEcTRkK2hQNGRUM1NrblFUYTNNdjQ2eG4zQmlER0lEK0lmKzJNSkczejJGM3VWeld0cGQvcFlTUCtNdXEzZ0F0eGkrSmo5dkZYakdkQ0xXZzhDS0h2ZEY5N0JrUUE9PQ==";
	Config.defaultHost = "openadmin123.rcosnita-bc.worldsecuresystems.com";
	Config.defaultProtocol = "https";

	Config.bcWebResourcesApp = "/webresources";
	Config.bcRegistryUrl = Config.bcWebResourcesApp + "/api/v3/sites/current/registry";

	Config.limits = {
		skip: 0,
		limit: 10
	};

	Config.api = {
		accessToken: BCAPI.Helper.Site.getAccessToken() || Config.defaultAccessToken,
		host: Config.defaultHost /*defaultHost*/,
		protocol: Config.defaultProtocol /*defaultProtocol*/
	};

	Config.errors = {
		"displayTimeout": 4000
	};

	
	BCAPI.Config = Config;
})(jQuery);
