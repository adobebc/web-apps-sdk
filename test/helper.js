(function($) {
    "use strict";

    BCAPI.Helper.Test = {
        useTestServer: function() {
            if (!BCAPI.Helper.Site.getRootUrl.isSpy()) {
                spyOn(BCAPI.Helper.Site, "getRootUrl").andReturn('https://api-dc1.secure-earth.bc.corp.adobe.com/');
            };

            if (!BCAPI.Helper.Site.getSiteId.isSpy) {
                apyOn(BCAPI.Helper.Site, 'getSiteId').andReturn(38604);
            }

            var genericToken = '',
                siteToken = '';

            if (!BCAPI.Helper.Site.getGenericToken.isSpy()) {
                runs(function() {
                    $
                        .ajax({
                            type: 'POST',
                            url: BCAPI.Helper.Site.getRootUrl() + '/api/v2/admin/tokens',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
                                password: 'password9' // '123456'
                            })
                        })
                        .done(function(data) {
                            genericToken = data.token;
                            spyOn(BCAPI.Helper.Site, "getGenericToken").andReturn(genericToken);
                        });
                });

                waitsFor(function() {
                    return !!genericToken;
                }, 'Get genericToken', 10 * 1000);
            }

            if (!BCAPI.Helper.Site.getSiteToken.isSpy()) {
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
                            siteToken = data.token;
                            spyOn(BCAPI.Helper.Site, "getSiteToken").andReturn(siteToken);
                        });
                });

                waitsFor(function() {
                    return !!siteToken;
                }, 'Get siteToken', 5000);
            }
        }
    };

})(jQuery);