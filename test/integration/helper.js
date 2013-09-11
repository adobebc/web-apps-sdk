(function($) {
    "use strict";
    
    var config = BCAPI.Config.TestServer;

    function mockGenericToken() {
        spyOn(BCAPI.Helper.Site, "getGenericToken").andReturn(config.genericToken);
    }
    function mockSiteToken() {
        spyOn(BCAPI.Helper.Site, "getSiteToken").andReturn(config.siteToken);
    }

    BCAPI.Helper.Test = {
        runTestServer: function() {
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
                }, 'Get genericToken', config.tokenRequestTimeout);
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
                    }, 'Get siteToken', config.tokenRequestTimeout);
                }
            }
        }
    };

})(jQuery);