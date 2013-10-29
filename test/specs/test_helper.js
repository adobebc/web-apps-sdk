describe("Helper.Site", function() {

    it("Test if no $.cookie", function(){     
        spyOn($, "error");

        BCAPI.Helper.Site.getAccessToken();
        expect($.error).toHaveBeenCalled();
    });

    it("Test it gets token from cookie if it exists", function(){
        spyOn($, "cookie").andCallFake(function(){return true;});

        BCAPI.Helper.Site.getAccessToken();
        expect($.cookie).toHaveBeenCalledWith('access_token');
    });
 
    it("Test it gets token from hash parameters if it it's not in cookie", function(){
        spyOn($, "cookie").andCallFake(function(){return undefined;});

        spyOn(BCAPI.Helper.Http, "getCurrentLocation").andCallFake(function(){
            var link = document.createElement("a");
            link.href = "http://businesscatalyst.com#access_token=febf7b6a027";
            return link;
        });

        expect(BCAPI.Helper.Site.getAccessToken()).toBe('febf7b6a027');

        expect($.cookie).toHaveBeenCalledWith('access_token','febf7b6a027');
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