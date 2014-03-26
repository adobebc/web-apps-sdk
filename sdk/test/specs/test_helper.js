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
describe("Helper.Site", function() {		
    describe("Helper.Site.getAccessToken", function(){
        var jQueryCookie;
    	
    	beforeEach(function() {
    		jQueryCookie = $.cookie;
    	});
    	
        afterEach(function() {
        	$.cookie = jQueryCookie;        	
        });
    	
        function _fakeGetCurrentLocation(location) {
            spyOn(BCAPI.Helper.Http, "getCurrentLocation").andCallFake(function(){
                var link = document.createElement("a");
                link.href = location;
                return link;
            });
        };
        
        /**
         * This method calculates an expiry date starting from a given current date and compensate $.cookie
         * behavior toUTCString by adding timezone offset.
         */
        function _calculateExpiryDateWithOffset(currDate, expiryPeriod) {
            var expiryDate = currDate;
            var offset = expiryDate.getTimezoneOffset();
            
            expiryDate.setMinutes(-offset);
            expiryDate.setTime(expiryDate.getTime() + expiryPeriod * 1000);
            
            return expiryDate;
        };

        it("Test if no $.cookie", function() {
        	$.cookie = undefined;
        	
            spyOn($, "error");

            var accessToken = BCAPI.Helper.Site.getAccessToken();
            
            expect(accessToken).toBeUndefined();
            expect($.error).toHaveBeenCalled();
        });
     
        it("Test it gets token from hash parameters", function() {        	
            spyOn($, "cookie").andCallFake(function(){return undefined;});

            _fakeGetCurrentLocation("http://businesscatalyst.com#access_token=febf7b6a027");

            expect(BCAPI.Helper.Site.getAccessToken()).toBe('febf7b6a027');
            expect($.cookie).toHaveBeenCalled();
        });

        it("Test token is set in cookie with expiration from hash parameter", function() {
        	var currDate = new Date();
        	var expectedToken = "febf7b6a027==";
            var mockDateTime = currDate.getTime();

            spyOn($, "cookie").andCallFake(function() {
            	return undefined;
            });
            
            spyOn(Date, "now").andCallFake(function() {
            	return mockDateTime;
            });

            _fakeGetCurrentLocation("http://businesscatalyst.com#access_token=" + expectedToken + "&expires_in=900");

            var accessToken = BCAPI.Helper.Site.getAccessToken()
            
            expect(accessToken).toBe(expectedToken);

            var expiryDate = _calculateExpiryDateWithOffset(currDate, 15 * 60);
            
            expect($.cookie).toHaveBeenCalledWith('access_token',expectedToken, 
            				{"expires": expiryDate,
            				 "path": "/",
            				 "secure": true});
        });

        it("Test token is set in cookie with default expiration if not in hash parameters", function(){
        	var currDate = new Date();
        	var expectedToken = "=febf7b6a027=="
            var mockDateTime = currDate.getTime();

            spyOn($, "cookie").andCallFake(function() {
            	return undefined;
            });
            spyOn(Date, "now").andCallFake(function() {
            	return mockDateTime;
            });

            _fakeGetCurrentLocation("http://businesscatalyst.com#access_token=" + expectedToken);

            var accessToken = BCAPI.Helper.Site.getAccessToken()
            expect(accessToken).toBe(expectedToken);
            
            //default expiration is 4h if none was passed
            var expiryDate = _calculateExpiryDateWithOffset(currDate, 4 * 60 * 60);

            expect($.cookie).toHaveBeenCalledWith('access_token', expectedToken, 
            			{ "expires": expiryDate,
            			  "path": "/",
            			  "secure": true});
        });

        it("Test it gets token from cookie if it's not in hash", function(){
            _fakeGetCurrentLocation("http://businesscatalyst.com");

            spyOn($, "cookie").andCallFake(function(){return true;});

            BCAPI.Helper.Site.getAccessToken();
            expect($.cookie).toHaveBeenCalledWith('access_token');
        });
    });
    
    it("Test getSiteId returns 'current'", function() {
        expect(BCAPI.Helper.Site.getSiteId()).toBe('current');
    });

    it("Test getRootUrl correct location.", function() {
    	var protocol = "https:",
    		hostname = "appkey-123-apps.worldsecuresystems.com",
    		expectedLocation = [protocol, "//", hostname].join(""),
    		wnd = {"location": {
    			"hostname": hostname,
    			"protocol": protocol
    		}};
    	
    	expect(BCAPI.Helper.Site.getRootUrl(wnd)).toBe(expectedLocation)
    });    
});

describe("Helper.Http", function(){

    function _getNumberOfOwnProperties(obj){
        var counter = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                counter++;
            }
        }
        return counter;
    }

    function _getMockLocation(location){
        var link = document.createElement("a");
        link.href = location;
        return link;
    }

    describe("Helper.Http.getQueryParameters", function(){
        it("Test if location is undefined", function(){
            var mockLocation = _getMockLocation();
            var params = BCAPI.Helper.Http.getQueryParameters(mockLocation);
            
            expect(_getNumberOfOwnProperties(params)).toBe(0);
        });

        it("Test if parameter string is empty (no ?)", function(){
            var mockLocation = _getMockLocation("http://app.businesscatalyst.com");
            var params = BCAPI.Helper.Http.getQueryParameters(mockLocation);
            
            expect(_getNumberOfOwnProperties(params)).toBe(0);
        });

        it("Check it returns correct number of parameters", function (){
            var mockLocation = _getMockLocation("http://app.businesscatalyst.com?param1=value1&param2=value2&param3=value3");
            var params = BCAPI.Helper.Http.getQueryParameters(mockLocation);

            expect(_getNumberOfOwnProperties(params)).toBe(3);
        });
    });

    describe("Helper.Http.getHashFragments", function(){
        it("Test if location is undefined", function(){
            var mockLocation = _getMockLocation();
            var params = BCAPI.Helper.Http.getHashFragments(mockLocation);
            
            expect(_getNumberOfOwnProperties(params)).toBe(0);
        });

        it("Test if parameter string is empty (no #)", function(){
            var mockLocation = _getMockLocation("http://app.businesscatalyst.com");
            var params = BCAPI.Helper.Http.getHashFragments(mockLocation);
            
            expect(_getNumberOfOwnProperties(params)).toBe(0);
        });

        it("Check it returns correct number of parameters", function (){
            var mockLocation = _getMockLocation("http://app.businesscatalyst.com#param1=value1&param2=value2&param3=value3");
            var params = BCAPI.Helper.Http.getHashFragments(mockLocation);

            expect(_getNumberOfOwnProperties(params)).toBe(3);
        });
    });

    describe("Helper.Http.getDecodedParameters", function(){
        it("Check it returns correct parameter", function (){
            var params = BCAPI.Helper.Http.getDecodedParameters('param1=value1');

            expect(_getNumberOfOwnProperties(params)).toBe(1);
            expect(params['param1']).toBe('value1');
        });

        it("Check it works with multiple parameters", function (){
            var params = BCAPI.Helper.Http.getDecodedParameters('param1=value1&param2=value2&param3=value3');

            expect(_getNumberOfOwnProperties(params)).toBe(3);
            expect(params['param1']).toBe('value1');
            expect(params['param2']).toBe('value2');
            expect(params['param3']).toBe('value3');
        });

        it("Check it ignores params without value", function(){
            var params = BCAPI.Helper.Http.getDecodedParameters('paramNoValue&paramWithValue=myValue');

            expect(_getNumberOfOwnProperties(params)).toBe(1);
            expect(params['paramNoValue']).toBe(undefined);
            expect(params['paramWithValue']).toBe('myValue');
        });

        it("Check it decodes param values", function(){
            var params = BCAPI.Helper.Http.getDecodedParameters('encodedParam=my%26Value');

            expect(params['encodedParam']).toBe('my&Value');
        });

    });

});
