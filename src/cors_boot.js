(function ($) {	
	/**
	 * This namespace contains the classes used to make CORS (cross origin resource sharing) work
	 * on IE9 and less. We need this because Business Catalyst APIs are on a different domain than
	 * admin console.
	 * 
	 * @namespace BCAPI.Helper.CORS
	 */
	BCAPI.Helper.CORS = {};
	
	/**
	 * This class boots the frameproxy (iframe) used to fix CORS ajax calls on IE9 and less.
	 * 
	 * @name CorsBoot
	 * @class
	 * @constructor
	 * @memberOf BCAPI.Helper.CORS
	 * 
	 * @param {JQuery} jQuery JQuery instance which can be used in CORS fix.
	 * @param {String} rootUrl Of Business Catalyst APIs.
	 */
	BCAPI.Helper.CORS.CorsBoot = function(jQuery, rootUrl) {
		this._jQuery = jQuery;
		this._rootUrl = rootUrl;
	};
	
	/**
	 * This method detect the Internet Explorer version based on user agent and app name.
	 * 
	 * @name _getIEVersion
	 * @method
	 * @instance
	 * @memberOf BCAPI.Helper.CORS.CorsBoot
	 * @returns {Number} Internet Explorer version or -1 for any other browser.
	 */
	BCAPI.Helper.CORS.CorsBoot.prototype._getIEVersion = function() {
        var rv = -1;
        
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        
        return rv;
    };
    
    /**
     * This method enables CORS support for Internet Explorer browsers.
     * 
     * @name boot
     * @method
     * @instance
     * @memberOf BCAPI.Helper.CORS.CorsBoot
     */
    BCAPI.Helper.CORS.CorsBoot.prototype.boot = function() {
        var ieVersion = this._getIEVersion();
        
        if (ieVersion == -1 || ieVersion >= 10) {
        	return;
        }
        
        this._jQuery.ajaxSetup({ cache: false });
        
        var proxy = new frameproxy.ProxyClient(this._rootUrl + '/AdminConsoleXT/frameproxy.htm');
        proxy.wrapAll(true);
                    
        this._jQuery.currentFrameProxy = proxy;        
    };
    
    var corsBoot = new BCAPI.Helper.CORS.CorsBoot($, BCAPI.Helper.Site.getRootUrl());
    corsBoot.boot();
})(jQuery);