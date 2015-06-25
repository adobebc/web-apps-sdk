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
	 * This class provides the data used for error handling. It is the main way for other components of the application
	 * to send error message notifications.
	 */
	function ErrorHandlingDataService($timeout, configService, globalLoadingService) {
		this._$timeout = $timeout;
		this._configService = configService;		
		this._globalLoadingService = globalLoadingService;

		this.errorData = {
			"message": undefined,
			"level": undefined
		};
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method logs an error which occured in application.
	 */
	ErrorHandlingDataService.prototype.logError = function(errMsg) {
		console.log(errMsg);

		this.errorData = {
			"message": errMsg,
			"level": "error"
		};

		this._globalLoadingService.setLoading(false);
		this._clearError();
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method logs an warning message.
	 */
	ErrorHandlingDataService.prototype.logWarning = function(warnMsg) {
		console.log(warnMsg);

		this.errorData = {
			"message": warnMsg,
			"level": "warn"
		};

		this._globalLoadingService.setLoading(false);
		this._clearError();		
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method logs an info.
	 */
	ErrorHandlingDataService.prototype.logInfo = function(infoMsg) {
		console.log(infoMsg);
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method clears the error data after a given time (expressed in milliseconds).
	 */
	ErrorHandlingDataService.prototype._clearError = function(delay) {
		var self = this;

		delay = delay || this._configService.errors.displayTimeout;

		this._$timeout(function() {
			self.errorData = undefined;
		}, delay);
	};

	app.service("ErrorHandlingDataService", ["$timeout", "ConfigService", "GlobalLoadingService", 
											 ErrorHandlingDataService]);
})(DiscoveryApp);