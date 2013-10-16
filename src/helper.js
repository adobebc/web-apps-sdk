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
     * @returns {string}
     */
    BCAPI.Helper.Site.getAccessToken = function() {
        //noinspection JSValidateTypes

        var errMessage = 'Include jQuery.cookie or override BCAPI.Helper.Site.getAccessToken with your own implementation.';
        
        if (!$.cookie) {
            return $.error(errMessage);
        }
        if ($.cookie('access_token')){
            return $.cookie('access_token');
        }

        var location = BCAPI.Helper.Http.getCurrentLocation();
        var queryParameters = BCAPI.Helper.Http.getQueryParameters(location);
        if (queryParameters['access_token']){
            $.cookie('access_token', queryParameters['access_token']);
            return queryParameters['access_token'];
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
     * @returns {object}
     */
    BCAPI.Helper.Http.getQueryParameters = function(location) {
        var params = location.search.substr(1).split('&'),
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
     * @returns {string}
     */
    BCAPI.Helper.Http.getCurrentLocation = function() {
        return window.location;
    };

})(jQuery);
