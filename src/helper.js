(function($) {

    /**
     * Contains various utility or configuration functions.
     *
     * @namespace BCAPI.Helper
     */
    BCAPI.Helper = {};

	/**
     * Site configuration functions.
     * Override with your own version if needed.
     *
	 * @namespace BCAPI.Helper.Site
	 */
    BCAPI.Helper.Site =  {};

    /**
     * Returns the access_token from either the URL fragment or a session cookie (if it was read from URL and set before in cookie for short term reference)
     * 
     * @returns {string} The access_token
     */
    BCAPI.Helper.Site.getAccessToken = function() {
        //noinspection JSValidateTypes

        var errMessage = 'Include jQuery.cookie or override BCAPI.Helper.Site.getAccessToken with your own implementation.';
        
        if (!$.cookie) {
            return $.error(errMessage);
        }
        var tokenCookie = $.cookie('access_token');
        if (tokenCookie){
            return tokenCookie;
        }

        var location = BCAPI.Helper.Http.getCurrentLocation();
        var parameters = BCAPI.Helper.Http.getHashFragments(location);
        if (parameters['access_token']){
            $.cookie('access_token', parameters['access_token']);
            return parameters['access_token'];
        }
        return $.error(errMessage);
	};

    /**
     * @returns {string}
     */
    BCAPI.Helper.Site.getRootUrl = function() {
        //noinspection JSUnresolvedVariable
        return top.authData ? 'https://' + top.authData.apiUrl : '';
    };

    /**
     * @returns {string}
     */
    BCAPI.Helper.Site.getSiteId = function() {
        return 'current';
    };

    /**
     * Http utility functions.
     * Override with your own version if needed.
     *
     * @namespace BCAPI.Helper.Http
     */
    BCAPI.Helper.Http =  {};

    /**
     * Utility function to parse and decode parameters from a search or hash location part
     * 
     * @returns {object}
     * @example
     * // returns an object with key value pairs for each parameter (parameterName: parameterValue)
     * result = BCAPI.Helper.Http.getDecodedParameters("access_token=febf7b6a027b49239331cb6fa144&token_type=example")
     * // result = {"access_token": "febf7b6a027b49239331cb6fa144", "token_type": "example"}
     */
    BCAPI.Helper.Http.getDecodedParameters = function(paramString) {
        var params = paramString.split('&'),
            i,
            p,
            decodedParams = {};
        if (params === "") { return {}; }
        for (i = 0; i < params.length; i += 1) {
            p = params[i].split('=');
            if (p.length === 2) {
                decodedParams[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }
        return decodedParams;
    };

    /**
     * Utility function to get the decoded query parameters from the location passed
     * 
     * @param {string} location Location object (e.g. the current location of the document)
     * @returns {object} An object with key value pairs for each query parameter with value
     * @example
     * result = BCAPI.Helper.Http.getQueryParameters("http://myexample.com?param1=value1&param2=value2")
     * // result = {"param1": "value1", "param2": "value2"}
     */
    BCAPI.Helper.Http.getQueryParameters = function(location) {
        if (typeof location.search == undefined || location.search.length == 0){
            return {};
        }
        return BCAPI.Helper.Http.getDecodedParameters(location.search.substr(1));
    };

     /**
     * Utility function to get the decoded hash parameters from the location passed
     * 
     * @param {string} location Location object (e.g. the current location of the document)
     * @returns {object} An object with key value pairs for each hash parameter with value
     * @example
     * result = BCAPI.Helper.Http.getHashFragments("http://myexample.com#param1=value1&param2=value2")
     * // result = {"param1": "value1", "param2": "value2"}
     */
    BCAPI.Helper.Http.getHashFragments = function(location) {
        if (typeof location.hash == undefined || location.hash.length == 0){
            return {};
        }
        return BCAPI.Helper.Http.getDecodedParameters(location.hash.substr(1));
    };

    /**
     * Helper function to isolate getting actual location, for unit testing
     * @returns {string}
     */
    BCAPI.Helper.Http.getCurrentLocation = function() {
        return window.location;
    };

})(jQuery);
