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
        if (!$.cookie) {
            return $.error('Include jQuery.cookie or override BCAPI.Helper.Site.getAccessToken with your own implementation.');
        }

        var currLocation = BCAPI.Helper.Http.getCurrentLocation();
        var parameters = BCAPI.Helper.Http.getHashFragments(currLocation);
        var paramAccessToken = parameters['access_token'];
        var expiresIn = parseInt(parameters["expires_in"] || "0");

        if(paramAccessToken) {
        	if(expiresIn <= 0) {
        		return $.error("Access token can not be set without an expires_in period.");
        	}
        	
        	expiresIn = new Date(Date.now() + expiresIn * 1000); 
        		
        	$.cookie("access_token", paramAccessToken, {expires: expiresIn});
        }
        
        return paramAccessToken || $.cookie('access_token');         
	};

    /**
     * This method obtains secure url required for API calls. It uses the current host from location
     * in order to detect prefix of APIs url. We can do this because BC api js sdk is always used 
     * with 3rd party applications served from a separated domain. 
     * 
     * @returns {string} API secure url.
     */
    BCAPI.Helper.Site.getRootUrl = function(wnd) {
    	wnd = wnd || window;
    	
        var url = [wnd.location.protocol, "//", wnd.location.hostname].join("");
        
        return url;
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
