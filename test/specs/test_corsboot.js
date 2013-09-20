describe("Unit tests for frameproxy boot.", function() {
	var rootUrl = "https://cors.localhost.com",
		oldAppName = undefined,
		expectedAppName = "Microsoft Internet Explorer",
		oldUserAgent = undefined,
		oldProxyClient = undefined;

	beforeEach(function() {
		BCAPI.Mocks.Helper.Site(undefined, undefined, rootUrl);
		
		oldAppName = navigator.appName;
		oldUserAgent = navigator.userAgent;
		oldProxyClient = frameproxy.ProxyClient;
	});
	
	afterEach(function() {
		navigator.appName = oldAppName;
		navigator.userAgent = oldUserAgent;
		frameproxy.ProxyClient = oldProxyClient;
	});
	
	function _mockNavigatorBrowser(appName, userAgent) {
		navigator.__defineGetter__("userAgent", function(){
		    return userAgent;
		});

		navigator.__defineGetter__("appName", function(){
		    return appName;
		});
	}
	
	function _mockIEUserAgent(ieVersion) {
		var userAgent = "Mozilla/4.0 (compatible; MSIE " + ieVersion + "; Windows NT 6.2; Trident/6.0)";
		
		_mockNavigatorBrowser(appName, userAgent);
	};
	
	function _testProxyWorksOnIe(ieVersion) {
		var cacheEnabled = true,
			jQuery = {ajaxSetup: function(options) {
				cacheEnabled = options.cache;
			}},
			corsBoot = new BCAPI.Helper.CORS.CorsBoot(jQuery, rootUrl),
			expectedUrl = rootUrl + '/AdminConsoleXT/frameproxy.htm',
			wrapCalled = false;
		
		expect(corsBoot._jQuery).toBe(jQuery);
		expect(corsBoot._rootUrl).toBe(rootUrl);
		
		_mockIEUserAgent(7.0);
		
		frameproxy.ProxyClient = function(apiUrl) {
			expect(apiUrl).toBe(expectedUrl);
		};
		
		frameproxy.ProxyClient.prototype.wrapAll = function(enable) {
			expect(enable).toBe(true);
			wrapCalled = true;
		};
		
		corsBoot.boot();
		
		expect(wrapCalled).toBe(true);
		
		expect(jQuery.currentFrameProxy instanceof frameproxy.ProxyClient).toBe(true);
		expect(cacheEnabled).toBe(false);
	};
	
	it("Check proxy boot works as expected on IE 7.", function() {
		_testProxyWorksOnIe(7.0);
	});
	
	it("Check proxy boot works as expected on IE 8.", function() {
		_testProxyWorksOnIe(8.0);
	});
	
	it("Check proxy boot works as expected on IE 9.", function() {
		_testProxyWorksOnIe(9.0);
	});

	it("Check proxy boot works as expected on IE 10.", function() {
		_testProxyWorksOnIe(10.0);
	});

	it("Check proxy boot works as expected on IE 11.", function() {
		_testProxyWorksOnIe(11.0);
	});
	
	it("Check start boot does not start on non ie browsers.", function() {
		
	});
});