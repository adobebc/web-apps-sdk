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
    BCAPI.Helper.Site.getGenericToken = function() {
        //noinspection JSValidateTypes
        return $.cookie ? $.cookie('genericAuthToken') :
            $.error('Include jQuery.cookie or override BCAPI.Helper.Site.getGenericToken with your own implementation.');
	};

    /**
     * @returns {string}
     */
    BCAPI.Helper.Site.getSiteToken = function() {
        //noinspection JSValidateTypes
        return $.cookie ? $.cookie('siteAuthToken') :
            $.error('Include jQuery.cookie or override BCAPI.Helper.Site.getSiteToken with your own implementation.');
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

})(jQuery);