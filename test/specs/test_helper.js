describe("Helper.Site", function() {

    it("tries to use JQuery.cookie to get tokens", function() {
        spyOn($, "error");

        BCAPI.Helper.Site.getAccessToken();
        expect($.error).toHaveBeenCalled();

        spyOn($, "cookie").andCallFake(function(){return true;});

        BCAPI.Helper.Site.getAccessToken();
        expect($.cookie).toHaveBeenCalledWith('access_token');

        expect(BCAPI.Helper.Site.getSiteId()).toBe('current');
    });

    it("gets token from URL parameter", function() {
        
        spyOn($, "cookie").andCallFake(function(){return undefined;});
        
        spyOn(BCAPI.Helper.Http, "getCurrentLocation").andCallFake(function(){
            var link = document.createElement("a");
            link.href = "http://businesscatalyst.com?access_token=febf7b6a027";
            return link;
        });

        expect(BCAPI.Helper.Site.getAccessToken()).toBe('febf7b6a027');

        expect($.cookie).toHaveBeenCalledWith('access_token','febf7b6a027');
    });

    it("getRootUrl()", function() {
        expect(BCAPI.Helper.Site.getRootUrl()).toBe("");

        var host = 'secured.bc-local.com';
        top.authData = {};
        top.authData.apiUrl = host;
        expect(BCAPI.Helper.Site.getRootUrl()).toBe('https://' + host);
        delete top.authData;
    });
});

describe("Helper.Http", function(){

    function _getMockLocation(fakeURLParams){
        var link = document.createElement("a");
        link.href = "http://businesscatalyst.com" + fakeURLParams;
        return link;
    }

    it("Check it ignores params without value", function(){
        var mockLocation = _getMockLocation("?paramNoValue&paramWithValue=myValue");
        var params = BCAPI.Helper.Http.getQueryParameters(mockLocation);
        expect(params['paramNoValue']).toBe(undefined);
        expect(params['paramWithValue']).toBe('myValue');
    });

    it("Check it decodes param values", function(){
        var mockLocation = _getMockLocation("?encodedParam=my%26Value");
        var params = BCAPI.Helper.Http.getQueryParameters(mockLocation);
        expect(params['encodedParam']).toBe('my&Value');
    });
});