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
	 * This service is responsible for handling loading status of the application.
	 */
	function GlobalLoadingService(configService) {
		this._loading = false;
		this._loadingPending = false;
		this._configService = configService;

		console.log("Global loading service initialized correctly.");
	};


	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method sets the current loading status for the application.
	 */
	GlobalLoadingService.prototype.setLoading = function(loadingStatus) {
		this._loading = loadingStatus;
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method gets the current loading status for the application.
	 */
	GlobalLoadingService.prototype.isLoading = function() {
		return this._loading;
	};

	app.service("GlobalLoadingService", ["ConfigService", GlobalLoadingService]);
})(DiscoveryApp);