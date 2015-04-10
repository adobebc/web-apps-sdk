(function($) {

    /**
     * @public
     * @constructor
     * @description
     * This class provides the data used for error handling. It is the main way for other components of the application
     * to send error message notifications.
     */
    function ErrorHandlingDataService(configService) {

        this._configService = configService;


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

        setTimeout(function() {
            self.errorData = undefined;
        }, delay);

    };

    BCAPI.ErrorService = new ErrorHandlingDataService(BCAPI.Config);

})(jQuery);