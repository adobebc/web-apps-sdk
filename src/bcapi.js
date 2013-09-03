(function($) {
    'use strict';

    /**
     * Everything in this lib is n
     *
     * @namespace BCAPI
     */
    window.BCAPI = {};

    /**
     * Performs an AJAX request to a BC endpoint. <br>
     *
     * Uses JSON.
     *
     * Example:
     * ```
     * BCAPI.request('GET', 'templates').done(function(data) { console.log(data) })
     * BCAPI.request('GET', '/api/v2/admin/sites/current/templates').done(function(data) { console.log(data) })
     * ```
     * The 2 calls above do the same thing: fetch a list of templates and return the JSON data .
     *
     * @param verb GET|POST|PUT|DELETE
     * @param uri URL or API v2 endpoint name
     * @param data Object
     * @param rawData If TRUE, the data will not
     * @returns {Promise}
     */
    BCAPI.request = function(verb, uri, data, rawData) {
        var options = {},
            token = BCAPI.authToken;

        if (!uri) return new $.Deferred().reject().promise();

        verb = (verb || 'GET').toUpperCase();
        options.type = verb;

        BCAPI.log(verb + ' ' + uri);

        if (!rawData) {
            options.contentType = "application/json";
            if (data instanceof Paginator) data = data.items;
            data = data ? JSON.stringify(data) : data;
        }
        options.data = data;

        if (!uri.match(/https?:/)) {
            if (uri.charAt(0) !== '/') uri = '/api/v2/admin/sites/current/' + uri;
            uri = 'https://' + BCAPI.apiHost + uri;
        }
        options.url = uri;

        options.headers = $.extend({
            Authorization: $.isFunction(token) ? token(useGenericToken ? "genericAuthToken" : "siteAuthToken") : token
        }, options.headers);

        var jqXHR = jQuery.ajax(options);

        return jqXHR
            .then(function(data, status, xhr) {
                var location = xhr.getResponseHeader('Location');
                if (location && !data) {
                    return request('GET', location);
                }
                return data;
            })
            .promise(jqXHR); // return the original jqXHR with the new promise attached
    }    

    var request = BCAPI.request;

    BCAPI.debug = true;

    /**
     * LOg
     *
     * @function
     * @param msg
     */
    BCAPI.log = function(msg) {
        if (window.console && BCAPI.debug) console.log("BCAPI: " + msg);
    };

    BCAPI.authToken = $.cookie ? $.cookie : authTokenReaderMissing;

    BCAPI.apiHost = top.authData ? top.authData.apiUrl : 'bc-local.worldsecuresystems.com';

    function authTokenReaderMissing() {
        return '25e793cc1a014e3e868e8a3fc50e182acd62888df0894a76852e2cd03aa20ece';
        $.error('You will need jQuery.cookie if you want BC Auth Token to be auto-populated. Alternatively implement your own BCAPI.authToken reader.');
    };

    var useGenericToken = false;

    function requestEntity(entity, verb, uri, data, rawData) {
        return request(verb, uri, data, rawData)
            .then(function(data) {
                if ($.type(data) === 'object') {
                    if(entity.setAttributes) {
                        entity.setAttributes(data);
                    } else {
                        entity.attributes = data;
                    }
                }
                return entity;
            });
    }

    // Makes a GET request on a paginated BC REST API endpoint, and (optionally) converts the items to entity objects.
    function fetchList(uri, paginator) {
        return request('GET', uri)
            .then(function(data) {
                paginator = paginator || new Paginator();
                var Func = paginator.ItemConstructor;

                if (Func) {
                    paginator.items = $.map(data.items, function(item) {
                        return paginator.owner ? new Func(paginator.owner, item) : new Func(item);
                    });
                    delete data.items;
                }

                return $.extend(paginator, data);
            });
    }

    // Returns a function that will only be executed after being called N times.
    function after(times, func) {
        return function() {
            if (--times < 1 && func) {
                return func.apply(this, arguments);
            }
        };
    };

    function chain(items, func) {
        var promise = $.Deferred().resolve().promise();
        $.each(items, function(i, item) {
            promise = promise.then(func(item));
        });
        return promise;
    }

    function notSupported(what) {
        return function() { $.error(what + ' is not supported by BC API.'); };
    }
})(jQuery);