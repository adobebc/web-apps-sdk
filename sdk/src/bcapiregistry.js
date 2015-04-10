(function($) {

    function  Registry (config, errorService) {
        this._configService = config;
        this._errorService = errorService;
    };


    Registry.prototype.getRegistry = function() {
        var result =  $.Deferred(),
            self = this;

        if(this._cachedRegistry) {
                result.resolve(self._cachedRegistry);
        }
        else {
            this._loadBcRegistry().then(
                function(response) {
                    self._cachedRegistry = response;
                    result.resolve(self._cachedRegistry);
                },
                function(errorResponse) {
                    self._errorService.logError(errorResponse);
                });
        }

        return result.promise();
    };



    Registry.prototype._loadBcRegistry = function() {
        var rootUrl = [];

        if(this._configService.api.protocol && this._configService.api.host) {
            rootUrl.push(this._configService.api.protocol);
            rootUrl.push("://")
            rootUrl.push(this._configService.api.host);
        }

        rootUrl.push(this._configService.bcRegistryUrl);

        rootUrl = rootUrl.join("");

        return $.ajax({
            url: rootUrl,
            type: "GET",
            connection: "keep-alive",
            contentType: "application/json",
            headers: {
                "Accept": "application/json",
                "Authorization": this._configService.api.accessToken,
                "X-Adobe-SSL": true
            }
        });
    };


    BCAPI.Registry = new Registry(BCAPI.Config, BCAPI.ErrorService);
})(jQuery);