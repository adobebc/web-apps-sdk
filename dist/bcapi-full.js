(function($) {
    'use strict';

    /**
     * Everything in this lib is n
     *
     * @namespace BCAPI
     */
    window.BCAPI = window.BCAPI || {};

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
    };  


    /**
     * When TRUE will log all requests and other info
     * 
     * @type Boolean
     */
    BCAPI.debug = true;

    /**
     * Logger
     *
     * @function
     * @param msg {String}
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

    BCAPI._useGenericToken = false;

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
    }

    // Makes a GET request on a paginated BC REST API endpoint, and (optionally) converts the items to entity objects.
    BCAPI._fetchList = function(uri, paginator) {
        return BCAPI.request('GET', uri)
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
    BCAPI.after = function(times, func) {
        return function() {
            if (--times < 1 && func) {
                return func.apply(this, arguments);
            }
        };
    };

    BCAPI.chain = function(items, func) {
        var promise = $.Deferred().resolve().promise();
        $.each(items, function(i, item) {
            promise = promise.then(func(item));
        });
        return promise;
    }

    BCAPI._notSupported = function(what) {
        return function() { $.error(what + ' is not supported by BC API.'); };
    }
})(jQuery);;(function($) {
	"use strict";
	
	BCAPI.EntityBase = {
        attributes: undefined,
        links: undefined,

        linkUri: function(name) {
            if (!this.links) return;
            for (var i = 0; i < links.length; i++) {
                if (this.links[i].rel === name) return this.links[i].uri;
            }
        },

        setAttributes: function(attr) {
            attr = attr || {};
            this.links = attr.links;
            delete attr.links;
            this.attributes = attr;
            return this;
        }
    };
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.EntityCRUD = $.extend({
        uri: function() {
            $.error('EntityCRUD.uri() not implemented');
        },
        request: function(verb, data, rawData) {
            return BCAPI.requestEntity(this, verb, this.uri(), data, rawData);
        },

        // Asynchronously refreshes the attributes.
        fetch: function() {
            return this.request('GET');
        },

        // PUTs changes on the server.
        save: function() {
            return this.request('PUT', this.attributes);
        },

        // DELETEs the entity from the server.
        remove: function() {
            return this.request('DELETE');
        }
    }, BCAPI.EntityBase);
})(jQuery);;(function($) {
	"use strict";
	
    /**
     * Paginator blah-blah.
     *
     * Multiline
     *
     * - docs
     * - in *markdown*
     *
     * @name BCAPI.Paginator
     * @class
     * @constructor
     */
	BCAPI.Paginator = function(ItemConstructor, owner, items) {
        this.items = items || [];
        this.owner = owner;
        this.ItemConstructor = ItemConstructor;
    }

    $.extend(BCAPI.Paginator.prototype, {
        items: undefined,
        totalItemsCount: undefined,
        links: undefined,

        owner: undefined,
        ItemConstructor: undefined,
        linkUri: BCAPI.EntityBase.linkUri,

        fetchCurrPage: function() {
            return fetchList(this.linkUri('self'), this);
        },
        fetchNextPage: function() {
            return fetchList(this.linkUri('next'), this);
        },
        fetchPreviousPage: function() {
            return fetchList(this.linkUri('previous'), this);
        },

        /**
         * Fetch items .
         *
         * @name request
         * @method
         * @public
         * @instance
         * @memberOf BCAPI
         */
        fetchItems: function() {
            var paginator = this;

            return $.Deferred(function(deferred) {
                if (!paginator.items || !paginator.items.length) {
                    deferred.resolve();
                    return;
                }

                var callback = after(paginator.items.length, function() { deferred.resolve() });

                $.each(paginator.items, function(i, item) {
                    item.fetch()
                        .done(callback)
                        .fail(deferred.reject);
                });
            }).promise();
        }
    });	
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.FactoryCRUD = {
        uri: function() {
            $.error('FactoryCRUD.uri() not implemented');
        },

        // Makes a POST to persist a new entity on the server.
        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        create: function(attributes) {
            return requestEntity(new this(attributes), 'POST', this.uri(), attributes);
        },

        // GETs all the entities of particular type from the server.
        // Returns an list, (later) populated asynchronously.
        // Use onSuccess if you need to work with the returned value.
        // In some cases, the entities in the list will be incomplete even after onSuccess fires.
        // Use entity.fetch() is an it does not contain all the attributes you need.
        list: function() {
            return fetchList(this.uri(), new BCAPI.Paginator(this));
        },

        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        get: function(id) {
            return new this({id: id}).fetch();
        }
    };

})(jQuery);;(function($) {
	"use strict";
	
	/**
     * BC FileSystem APIs
     *
     * @constructor
     * @augments BCAPI.EntityCRUD
     */
    BCAPI.File = function(path, attributes) {
        if (path.charAt(0) !== '/') path = '/' + path;
        this.path = path;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.File, {
        create: function(path, content) {
            var file = new this(path);
            return file
                .write(content)
                .then(function() {
                    return file.fetch();
                });
        },
        get: function(path) {
            return new this(path).fetch();
        },
        root: function() {
            return this.get('');
        }
    });

    $.extend(BCAPI.File.prototype, BCAPI.EntityCRUD, {

        contentUri: function() {
            return 'storage' + this.path;
        },
        uri: function() {
            return this.contentUri() + "?meta";
        },
        draftUri: function() {
            return this.contentUri() + "?version=draft";
        },

        setAttributes: function(attributes) {
            delete this.files;
            if (attributes && attributes.type === 'folder') {
                var folder = this;
                folder.files = $.map(attributes.contents, function(fileAttr) {
                    return new BCAPI.File(folder.path + '/' + fileAttr.name, fileAttr);
                });
            }

            return BCAPI.EntityBase.setAttributes.call(this, attributes);
        },

        remove: function(force) {
            return requestEntity(this, 'DELETE', this.contentUri() + '?force=' + !!force);
        },
        removeDraft: function() {
            return requestEntity(this, 'DELETE', this.draftUri() + '?force=' + !!force);
        },

        // Reads the contents from the (FTP) file
        read: function() {
            return requestEntity(this, 'GET', this.contentUri(), null, true);
        },
        readDraft: function() {
            return requestEntity(this, 'GET', this.draftUri(), null, true);
        },

        // Writes the contents to the (FTP) file
        write: function(contents) {
            return requestEntity(this, 'PUT', this.contentUri(), contents, true);
        },
        writeDraft: function(contents) {
            return requestEntity(this, 'PUT', this.draftUri(), contents, true);
        }
    });
})(jQuery);;(function($) {
	"use strict";

    BCAPI.WebApp = function(attributes) {
        this.setAttributes(attributes);
    };
	
    $.extend(BCAPI.WebApp, BCAPI.FactoryCRUD, {
        uri: function() { return 'webapps'; },

        get: function(name) {
            return new this({name: name}).fetch();
        },

        // Recreates a WebApp with its structure, fields, items and associated categories.
        createFromSchema: function(schema) {
            var webApp, categoriesMap;

            BCAPI.log("Create missing Categories...");
            
            return Category
                .createPathRecursive($.map(schema.categories, function(count, path) { return path; }))
                .then(function(map) {
                    categoriesMap = map;

                    BCAPI.log("Create WebApp...");
                    return WebApp.create(schema.webApp.attributes);
                })
                .then(function(wa) {
                    webApp = wa;

                    BCAPI.log("Assign countries...");
                    if (schema.countries && schema.countries.length) {
                        return webApp.saveCountries(schema.countries);
                    } else {
                        return webApp; // just goto next step
                    }
                })

                .then(function() {
                    BCAPI.log("Create fields...");
                    return chain(schema.webApp.fields, function(field) {
                        return WebAppField.create(webApp, field.attributes);
                    });
                })

                .then(function() {
                    BCAPI.log("Create items and assign categories...");
                    return chain(schema.items, function(item) {

                        return WebAppItem
                            .create(webApp, item.attributes)
                            .then(function(itemEntity) {
                                var categoryIds = $.map(item.categories, function(path) {
                                    return categoriesMap[path].attributes.id;
                                });
                                return itemEntity.saveCategories(categoryIds);
                            });
                    });
                })

                .then(function() {
                    BCAPI.log("Done.");
                    return webApp;
                });
        },

        // Creates a schema object, containing the object graph describing a WebApp and all it's associated data.
        // Can be serialized to JSON and later imported with a call to WebApp.createFromSchema(schema)
        exportSchema: function(name) {
            var schema = {},
                mapCategoryIdToPath;

            BCAPI.log("List Categories...");
            return Category.listWithFullPath()
                .then(function(mapPathToObject, mapIdToPath) {
                    mapCategoryIdToPath = mapIdToPath;

                    BCAPI.log("Get WebApp schema...");
                    return WebApp.get(name);
                })
                .then(function(webApp) {
                    schema.webApp = webApp;

                    $.each(webApp.fields, function(i, field) {
                        delete field.links;
                        delete field.webApp; // WebApp is already exposed, remove circular reference.
                    });

                    delete webApp.links;

                    var webAppAttr = webApp.attributes;
                    delete webAppAttr.id;
                    delete webAppAttr.createBy;
                    delete webAppAttr.createDate;
                    delete webAppAttr.itemSystemFields;
                    delete webAppAttr.lastUpdateBy;
                    delete webAppAttr.lastUpdateDate;

                    BCAPI.log("Get WebApp countries...");
                    return webApp.getCountries();
                })
                .then(function(countries) {
                    schema.countries = countries.items;

                    BCAPI.log("Get WebApp items...");
                    return WebAppItem.list(schema.webApp, 'limit=100') // max out limit
                })
                .then(function(paginatedItems) {
                    return $.Deferred(function(deferred) {
                        schema.items = paginatedItems.items;

                        // TODO: Should we export items from page 2+?

                        var categoriesDoneCallback = after(schema.items.length, function() {
                            deferred.resolve(schema);
                        });

                        BCAPI.log("Get items' categories...");
                        schema.categories = {};
                        $.each(schema.items, function(i, item) {
                            item.getCategories()
                                .fail(deferred.reject)
                                .done(function(categories) {
                                    item.categories = $.map(categories.items, function(categoryId) {
                                        var path = mapCategoryIdToPath[categoryId];

                                        // Count usage of each category
                                        schema.categories[path] = (schema.categories[path] || 0) + 1;

                                        return path;
                                    });
                                    categoriesDoneCallback();
                                });

                            delete item.links;
                            delete item.webApp; // WebApp is already exposed, remove circular reference.

                            var itemAttr = item.attributes;
                            delete itemAttr.id;
                            delete itemAttr.createDate;
                            delete itemAttr.lastUpdateDate;
                        });
                    }).promise();
                });
        },

        // Recreates a WebApp with its structure, fields, items and associated categories
        // from a file previously created with WebApp.get("MyApp").exportToFile()
        importFromFile: function(filename) {
            BCAPI.log('Importing WebApp from file "' + filename + '"...');

            if (filename.charAt(0) !== '/') {
                filename = '/Layouts/WebApps/' + filename + "/schema.json"
            }

            return new BCFile(filename)
                .read()
                .then(function(schema) {
                    return WebApp.createFromSchema($.parseJSON(schema));
                });
        },

        importFromFiles: function(filenames) {
            var webApps = {};

            return chain(filenames, function(filename) {
                    return WebApp
                        .importFromFile(filename)
                        .done(function(webApp) {
                            webApps[filename] = webApp;
                        });
                }).done(function() {
                    return webApps;
                });
        },

        // Creates a File, accessible via FTP with the schema of the WebApp and its associated data.
        exportToFile: function(webAppName, filename) {
            BCAPI.log('Exporting WebApp ' + webAppName + '"...');

            return WebApp
                .exportSchema(webAppName)
                .then(function(schema) {
                    filename = filename || '/Layouts/WebApps/' + schema.webApp.attributes.name + "/schema.json";
                    return new BCFile(filename)
                        .write(JSON.stringify(schema));
                });
        }
    });

    $.extend(BCAPI.WebApp.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return WebApp.uri() + "/" + this.attributes.name;
        },
        countriesUri: function() {
            return this.uri() + "/countries";
        },

        save: BCAPI._notSupported('WebApp.save()'),
        delete: BCAPI._notSupported('WebApp.delete()'),

        getCountries: function() {
            return fetchList(this.countriesUri());
        },
        saveCountries: function(countries) {
            return request('PUT', this.countriesUri(), countries);
        },

        setAttributes: function(attributes) {
            delete this.fields;
            if (attributes && attributes.fields) {
                var webApp = this;
                webApp.fields = $.map(attributes.fields, function(fieldAttr) {
                    return new WebAppField(webApp, fieldAttr);
                });

                // Updating field information directly from a WebApp.save() is not supported
                delete attributes.fields;
            }

            return EntityBase.setAttributes.call(this, attributes);
        }
    });
    
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.WebAppField = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.WebAppField, {
        uri: function(webApp) {
            return webApp.uri() + "/fields";
        },

        create: function(webApp, attributes) {
            return requestEntity(new this(webApp, attributes), 'POST', this.uri(webApp), attributes);
        },
        list: function(webApp) {
            return fetchList(this.uri(webApp), new Paginator(this, webApp));
        },
        get: function(webApp, id) {
            return new this(webApp, {id: id}).fetch();
        }
    });

    $.extend(BCAPI.WebAppField.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return BCAPI.WebAppField.uri(this.webApp) + "/" + this.attributes.id;
        }
    });	
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.WebAppItem = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.WebAppItem, {
        uri: function(webApp) {
            return webApp.uri() + "/items";
        },

        create: BCAPI.WebAppField.create,
        get: BCAPI.WebAppField.get,

        // Find items corresponding to the criteria specified in the <query> parameter.
        // The <query> can be either an URL query string or a key-value object.
        list: function(webApp, query) {
            var uri = this.uri(webApp);
            if (query) uri += '?' + (typeof query === "object" ? $.param(query) : query);
            
            return fetchList(uri, new BCAPI.Paginator(this, webApp));
        }
    });

    $.extend(BCAPI.WebAppItem.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return BCAPI.WebAppItem.uri(this.webApp) + "/" + this.attributes.id;
        },
        categoriesUri: function() {
            return this.uri() + "/categories";
        },

        getCategories: function() {
            return fetchList(this.categoriesUri());
        },
        saveCategories: function(categories) {
            return request('PUT', this.categoriesUri(), categories);
        }
    });
	
})(jQuery);;(function($) {
	"use strict";
	
	BCAPI.Category = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Category, BCAPI.FactoryCRUD, {
        uri: function() { return 'categories'; },

        // Checks if a category <path> exists and, if not, creates the needed categories.
        // The <onSuccess> callback will get the Category object as the first parameter.
        createPathRecursive: function(path, map) {
            if (!map) {
                return this
                    .listWithFullPath()
                    .then(function(map) {
                        return BCAPI.Category.createPathRecursive(path, map);
                    });
            }

            // We will chain category creation, instead of running them in parallel,
            // to make sure we don't have any racing conditions
            if ($.isArray(path)) {
                return chain(path, function(p) {
                    return BCAPI.Category.createPathRecursive(p, map);
                }).then(function() {
                    return map;
                });
            }

            var category = map[path];
            if (category) {
                return $.Deferred().resolve(category).promise();
            }

            var parentPath = path.replace(/\/[^\/]+$/, ''),
                name = path.replace(/.*\//, '');

            if (parentPath) {
                return BCAPI.Category
                    .createPathRecursive(parentPath, map)
                    .done(function(parentCategory) {
                        return BCAPI.Category
                            .create({name: name, parentId: parentCategory.attributes.id})
                            .done(function(category) {
                                map[path] = category;
                            });
                    });
            } else {
                return BCAPI.Category
                    .create({name: name})
                    .done(function(category) {
                        map[path] = category;
                    });
            }
        },

        listWithFullPath: function() {
            return $.Deferred(function(deferred) {
            	BCAPI.Category.list()
                    .fail(deferred.reject)
                    .done(function(categories) {
                        var mapIdToPath = {},
                            mapPathToObject = {};

                        function map(path, category) {
                            mapIdToPath[category.attributes.id] = category.attributes.fullPath = path;
                            mapPathToObject[path] = category;
                        }

                        // map level 0 categories
                        $.each(categories.items, function(i, category) {
                            var attrs = category.attributes;
                            if (attrs.parentId === -1) {
                                var path = '/' + attrs.name;
                                map(path, category);
                            }
                        });

                        // map level 1..2 categories
                        for (var l = 0; l < 2; l++) {
                            $.each(categories.items, function(i, category) {
                                var attr = category.attributes;
                                if (!mapIdToPath[attr.id] && mapIdToPath[attr.parentId]) {
                                    var path = mapIdToPath[attr.parentId] + '/' + attr.name;
                                    map(path, category);
                                }
                            });
                        }

                        deferred.resolve(mapPathToObject, mapIdToPath);
                    });
            }).promise();
        }
    });

    $.extend(BCAPI.Category.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return BCAPI.Category.uri() + "/" + this.attributes.id;
        },

        save: BCAPI._notSupported('Category.save()'),
        delete: BCAPI._notSupported('Category.delete()')
    });
	
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.Country = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Country, {
        uri: function() { return '/api/v2/admin/system/countries'; },

        list: BCAPI.FactoryCRUD.list,
        listForIp: function(ip) {
            return fetchList(this.uri() + '?ip=' + (ip || 'current'), new BCAPI.Paginator(Country));
        }
    });

    $.extend(BCAPI.Country.prototype, BCAPI.EntityBase);
	
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.Role = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Role, {
        uri: function() { return 'roles'; },
        list: BCAPI.FactoryCRUD.list
    });

    $.extend(BCAPI.Role.prototype, BCAPI.EntityBase);
	
})(jQuery);;(function($) {
	"use strict";
	
    BCAPI.Template = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Template, {
        uri: function() { return 'templates'; },
        list: BCAPI.FactoryCRUD.list
    });

    $.extend(BCAPI.Template.prototype, BCAPI.EntityBase);
	
})(jQuery);;(function($) {
	"use strict";

    BCAPI.Site = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Site, {
        list: function() {
        	BCAPI._useGenericToken = true;
            var list = fetchList('/api/v2/admin/sites', function(attr) { return new BCAPI.Site(attr); });
            BCAPI._useGenericToken = false;
            return list;
        },
        current: function() {
            requestEntity(new this(), 'GET', '/api/v2/admin/sites/current');
        }
    });

    $.extend(BCAPI.Site.prototype, BCAPI.EntityBase);	
})(jQuery);