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
(function(app, BCAPI) {
	var defaultAccessToken = "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdJbnFCeU9yOVhFb0g0VURuNmZJUHVDcXRzUldValFjYlZXZjRiWEtOemgvTVlTaEk1ZkNrWGx6dnVCdE9wNFhENW01UUhFcm5ZcEIxUklKQVNKWnQ3RmMySXVWWFBMK0M0ZHNBVUpLcWUwbXhRb2txbWsydlIrU2N2NjV6b3RXY0s0bXpjeVBSR3BBZGVSWlFHcDE0ZWdodFdaQzJVYzNiWVFpQnpiUFAxejJacTg3bGFJTGwzZkdmYzkvdnlKU09FRFppUGk5NnJSb2dLQlBYa0c5c3dSS2JiaGNaYmlKM2xwV2lEcTRkK2hQNGRUM1NrblFUYTNNdjQ2eG4zQmlER0lEK0lmKzJNSkczejJGM3VWeld0cGQvcFlTUCtNdXEzZ0F0eGkrSmo5dkZYakdkQ0xXZzhDS0h2ZEY5N0JrUUE9PQ==",
		defaultHost = "openadmin123.rcosnita-bc.worldsecuresystems.com";
		defaultProtocol = "https";

	/**
	 * @constructor
	 @ description
	 * This class contains all configuraion values required to control various features of BC discovery
	 * app.
	 */
	function ConfigService() {
		this.appVersion = "1.0-snapshot",
		this.bcWebResourcesApp = "/webresources",
		this.bcRegistryUrl = this.bcWebResourcesApp + "/api/v3/sites/current/registry";
		this.loaderDisplayDelay = 10;

		this.limits = {
			skip: 0,
			limit: 10
		};
		
		this.api = {
			accessToken: BCAPI.Helper.Site.getAccessToken() || defaultAccessToken,
			host: undefined /*defaultHost*/,
			protocol: undefined /*defaultProtocol*/
		};

		this.errors = {
			"displayTimeout": 4000
		};
	};

	app.service("ConfigService", [ConfigService]);
})(DiscoveryApp, BCAPI);