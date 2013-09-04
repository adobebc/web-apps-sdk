(function($) {
    'use strict';

    /**
     * Everything in this lib is namespaced.
     *
     * @namespace BCAPI
     */
    window.BCAPI = window.BCAPI || {};

    /**
     * @name Promise
     *
     * jQuery.Deferred.promise()
     *
     * @see http://api.jquery.com/deferred.promise/
     */

    /**
     * Performs an AJAX request to a BC endpoint. <br>
     *
     * Uses JSON.
     * The 2 calls in the examples section do the same thing: fetch a list of templates and return the JSON data.
     *
     * @example
     * BCAPI.request('GET', 'templates').done(function(data) { console.log(data) })
     * BCAPI.request('GET', '/api/v2/admin/sites/current/templates').done(function(data) { console.log(data) })
     *
     * @param verb {string} GET|POST|PUT|DELETE
     * @param uri {string} URL or API v2 endpoint name
     * @param data {object}, {string} if rawData == true
     * @param rawData {boolean} Set to true if you send non-JSON data to the server
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
            if (data instanceof BCAPI.Paginator) data = data.items;
            data = data ? JSON.stringify(data) : data;
        }
        options.data = data;

        if (!uri.match(/https?:/)) {
            if (uri.charAt(0) !== '/') uri = '/api/v2/admin/sites/current/' + uri;
            uri = 'https://' + BCAPI.apiHost + uri;
        }
        options.url = uri;

        options.headers = $.extend({
            Authorization: $.isFunction(token) ? token(BCAPI.useGenericToken ? "genericAuthToken" : "siteAuthToken") : token
        }, options.headers);
        BCAPI.useGenericToken = false;

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
    };  


    /**
     * When TRUE, BCAPI.log() will log all requests and other useful info.
     * 
     * @type {boolean}
     */
    BCAPI.debug = true;

    /**
     * Logger. Safe to override.
     *
     * @function
     * @param msg {string}
     */
    BCAPI.log = function(msg) {
        if (window.console && BCAPI.debug) console.log("BCAPI: " + msg);
    };

    /**
     * Safe to override.
     *
     * @type {string} or {Function}
     * @param cookieName {string} Token type
     * @returns {string} Authorization token
     */
    BCAPI.authToken = $.cookie ? $.cookie : authTokenReaderMissing;

    function authTokenReaderMissing() {
        $.error('You will need jQuery.cookie if you want BC Auth Token to be auto-populated. Alternatively implement your own BCAPI.authToken reader.');
    }

    //noinspection JSUnresolvedVariable
    /**
     * Hostname part of an API URL
     *
     * @type {string}
     */
    BCAPI.apiHost = top.authData ? top.authData.apiUrl : 'bc-local.worldsecuresystems.com';

    /**
     * Set to true, to force the next {BCAPI.request} to use generic token (istead of the default site token)
     *
     * @type {boolean}
     */
    BCAPI.useGenericToken = false;

    /**
     * Performs a request and updates the associated {Entity}.
     *
     * @param entity
     * @param verb
     * @param uri
     * @param data
     * @param rawData
     * @returns {Promise}
     * @private
     */
    BCAPI._requestEntity = function(entity, verb, uri, data, rawData) {
        return BCAPI.request(verb, uri, data, rawData)
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
    };

    /**
     * Makes a GET request on a paginated API endpoint, and (optionally) converts the items to entity objects.
     *
     * @param uri {string}
     * @param paginator {Paginator}
     * @returns {Promise}
     * @private
     */
    BCAPI._fetchList = function(uri, paginator) {
        return BCAPI.request('GET', uri)
            .then(function(data) {
                paginator = paginator || new BCAPI.Paginator();
                var Func = paginator.ItemConstructor;

                if (Func) {
                    paginator.items = $.map(data.items, function(item) {
                        return paginator.owner ? new Func(paginator.owner, item) : new Func(item);
                    });
                    delete data.items;
                }

                return $.extend(paginator, data);
            });
    };

    /**
     * Returns a function that will only be executed after being called N times.
     *
     * @param times
     * @param func
     * @returns {Function}
     */
    BCAPI.after = function(times, func) {
        return function() {
            if (--times < 1 && func) {
                return func.apply(this, arguments);
            }
            return undefined;
        };
    };

    /**
     * promise
     *      .then(func(items[0])
     *      .then(func(items[1])
     *      ...
     *      .then(func(items[n])
     *
     * @param items {Array}
     * @param func {Function}
     * @returns {Promise}
     */
    BCAPI.chain = function(items, func) {
        var promise = $.Deferred().resolve().promise();
        $.each(items, function(i, item) {
            promise = promise.then(func(item));
        });
        return promise;
    };

    /**
     * Used in entities with incomplete server-side CRUD implementations.
     *
     * @param what {string}
     * @returns {Function}
     * @private
     */
    BCAPI._notSupported = function(what) {
        return function() { $.error(what + ' is not supported by BC API.'); };
    }
})(jQuery);