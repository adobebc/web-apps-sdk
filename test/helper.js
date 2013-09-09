(function($) {
    "use strict";

    var config = {
        rootUrl: 'https://api-dc1.secure-earth.bc.corp.adobe.com/',
        siteId: 38604,
        username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
        password: 'password9', // '123456'
        genericToken: null,
        siteToken: null
    };

    function mockGenericToken() {
        spyOn(BCAPI.Helper.Site, "getGenericToken").andReturn(config.genericToken);
    }
    function mockSiteToken() {
        spyOn(BCAPI.Helper.Site, "getSiteToken").andReturn(config.siteToken);
    }

    BCAPI.Config.TestServer = config;

    BCAPI.Helper.Test = {
        useTestServer: function() {
            if (!BCAPI.Helper.Site.getRootUrl.isSpy) {
                spyOn(BCAPI.Helper.Site, "getRootUrl").andReturn(config.rootUrl);
            };

            if (!BCAPI.Helper.Site.getSiteId.isSpy) {
                spyOn(BCAPI.Helper.Site, 'getSiteId').andReturn(config.siteId);
            }

            if (!BCAPI.Helper.Site.getGenericToken.isSpy) {
                if (config.genericToken) {
                    mockGenericToken();
                } else {
                    runs(function() {
                        $
                            .ajax({
                                type: 'POST',
                                url: BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/tokens',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    username: config.username,
                                    password: config.password
                                })
                            })
                            .done(function(data) {
                                config.genericToken = data.token;
                                mockGenericToken();
                            });
                    });
                }

                waitsFor(function() {
                    return !!config.genericToken;
                }, 'Get genericToken', 1000);
            }

            if (!BCAPI.Helper.Site.getSiteToken.isSpy) {
                if (config.genericToken) {
                    mockSiteToken();
                } else {
                    runs(function() {
                        $
                            .ajax({
                                type: 'POST',
                                url: BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/sites/' + BCAPI.Helper.Site.getSiteId() + '/tokens',
                                contentType: 'application/json',
                                headers: {
                                    Authorization: BCAPI.Helper.Site.getGenericToken()
                                }
                            })
                            .done(function(data) {
                                config.siteToken = data.token;
                                mockSiteToken();
                            });
                    });

                    waitsFor(function() {
                        return !!config.siteToken;
                    }, 'Get siteToken', 1000);
                }
            }
        }
    };

})(jQuery);