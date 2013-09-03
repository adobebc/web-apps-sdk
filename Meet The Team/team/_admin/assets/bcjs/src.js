(function($) {
    'use strict';

    window.BCAPI = {};

    BCAPI.debug = true;
    BCAPI.log = function(msg) {
        if (window.console && BCAPI.debug) console.log("BCAPI: " + msg);
    };
    BCAPI.fallback = {
        apiHost: 'bc-local.worldsecuresystems.com',
        siteAuthToken: '4294036421dd4d0ca2f6c2ec56302f43e10f8707b824495ea9051a540b2bd00f',
        genericAuthToken: ''
    };

    var authCookieUseGeneric = false;

    // Makes a BC REST API request.
    var request = BCAPI.request = function(verb, url, data, onSuccess, onError, rawData) {
        var options;

        if (typeof verb === "object") {
            options = verb;
            verb = options.type || 'GET';
            url = options.url;
            data = options.data;
            onSuccess = options.success;
            onError = options.error;
            rawData = true;
        } else {
            options = {
                type: verb,
                error: onError
            };
        }
        BCAPI.log(verb + ' ' + url);

        if (!rawData) {
            options.contentType = "application/json";
            data = data ? JSON.stringify(data) : data;
        }
        options.data = data;

        if (!url.match(/https?:/)) {
            if (url.charAt(0) !== '/') url = '/api/v2/admin/sites/current/' + url;
            url = 'https://' + getApiHost()  + url;
        }
        options.url = url;

        options.headers = $.extend({
            Authorization: getAuthCookie()
        }, options.headers);

        options.success = function(data, status, xhr) {
            var location = xhr.getResponseHeader('Location');
            if (location && !data) {
                fetch(location, onSuccess, onError);
            } else {
                callOrLog(onSuccess)(data);
            }
        };

        return jQuery.ajax(options);
    }

    // Makes a GET request on BC REST API endpoint.
    function fetch(url, onSuccess, onError, rawData) {
        request('GET', url, null, onSuccess, onError, rawData);
    }

    // Returns current site's API hostname.
    function getApiHost() {

        // When loaded inside the Open Admin, the top frame will have the authData object defined.
        if (top.authData) return top.authData.apiUrl;

        return BCAPI.fallback.apiHost;
    }

    // Returns BC siteAuthToken.
    function getAuthCookie(cookieName) {
        cookieName = cookieName || (authCookieUseGeneric ? "genericAuthToken" : "siteAuthToken");
        if (document.cookie) {
            var arr = document.cookie.split(cookieName + '=');
            if (arr.length >= 2) {
                var arr2 = arr[1].split(';');
                return decodeURIComponent(arr2[0]);
            }
        }
        return BCAPI.fallback[cookieName];
    }


    // =============================================================================================================

    // Returns a function.
    function applyCallback(obj, func) {
        return function() {
            callOrLog(func)(obj);
        }
    }

    // Returns a function.
    function applyAttributesAndCallback(obj, func) {
        return function(attributes) {
            if(obj.setAttributes) {
                obj.setAttributes(attributes);
            } else {
                obj.attributes = attributes;
            }
            callOrLog(func)(obj);
        }
    }

    function callOrLog(func) {
        return function() {
            if (func) {
                return func.apply(this, arguments);
            } else {
                if (BCAPI.debug) console.log.apply(console, arguments);
            }
        };
    }

    // Returns a function that will only be executed the first time it is called.
    function once(func) {
        var times = 0;
        return function() {
            if (times++ < 1 && func) {
                return func.apply(this, arguments);
            }
        };
    }

    // Returns a function that will only be executed after being called N times.
    function after(times, func) {
        return function() {
            if (--times < 1 && func) {
                return func.apply(this, arguments);
            }
        };
    };


    // =============================================================================================================

    // Makes a GET request on a paginated BC REST API endpoint, and (optionally) converts the items to entity objects.
    function fetchList(uri, itemConverter, onSuccess, onError, paginate) {
        var result = paginate ? new Paginator() : [],
            list = paginate ? result.items : result;

        fetch(uri, function(data) {
            $.each(data.items, function(i, item) {
                list.push(itemConverter ? itemConverter(item) : item);
            });

            if (paginate) {
                delete data.items;
                $.extend(result, data);
            }

            callOrLog(onSuccess)(result);
        }, onError);
        return result;
    }

    var Paginator = BCAPI.Paginator = function(items) {
        this.items = items || [];
    }

    $.extend(Paginator.prototype, {
        skip: 0,
        limit: undefined,
        links: undefined,
        totalItemsCount: undefined,
        items: undefined,

        count: function() {
            return this.totalItemsCount != null ? this.totalItemsCount : this.items.length;
        }
    });


    // =============================================================================================================

    // Common methods used in most Entity class prototypes
    var FactoryBase = {
        uri: function() {
            $.error('FactoryBase.uri() not implemented');
        },

        // Makes a POST to persist a new entity on the server.
        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        create: function(attributes, onSuccess, onError) {
            var webApp = new this(attributes);
            request('POST', this.uri(), attributes, applyAttributesAndCallback(webApp, onSuccess), onError);
            return webApp;
        },

        // GETs all the entities of particular type from the server.
        // Returns an list, (later) populated asynchronously.
        // Use onSuccess if you need to work with the returned value.
        // In some cases, the entities in the list will be incomplete even after onSuccess fires.
        // Use entity.fetch() is an it does not contain all the attributes you need.
        list: function(onSuccess, onError) {
            var Constructor = this;
            return fetchList(this.uri(), function(attr) { return new Constructor(attr); }, onSuccess, onError);
        },

        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        get: function(id, onSuccess, onError) {
            return new this({id: id}).fetch(onSuccess, onError);
        }
    };

    // Common methods used in most Entity object
    var EntityBase = {
        attributes: undefined,
        links: undefined,

        uri: function() {
            $.error('EntityBase.uri() not implemented');
        },
        setAttributes: function(attr) {
            attr = attr || {}
            this.links = attr.links;
            delete attr.links;
            this.attributes = attr;
        },

        // Asynchronously refreshes the attributes.
        fetch: function(onSuccess, onError) {
            fetch(this.uri(), applyAttributesAndCallback(this, onSuccess), onError);
            return this;
        },

        // PUTs changes on the server.
        save: function(onSuccess, onError) {
            request('PUT', this.uri(), this.attributes, applyCallback(this, onSuccess), onError);
            return this;
        },

        // DELETEs the entity from the server.
        remove: function(onSuccess, onError) {
            request('DELETE', this.uri(), null, applyCallback(this, onSuccess), onError);
            return this;
        }
    };


    // =============================================================================================================

    // BC FileSystem APIs
    var BCFile = BCAPI.File = function(path, attributes) {
        if (path.charAt(0) !== '/') path = '/' + path;
        this.path = path;
        this.setAttributes(attributes);
    };

    $.extend(BCFile, {
        create: function(path, content, onSuccess, onError) {
            new this(path).write(content, function(file) {
                file.fetch(onSuccess, onError);
            });
        },
        get: function(path, onSuccess, onError) {
            return new this(path).fetch(onSuccess, onError);
        },
        root: function(onSuccess, onError) {
            return this.get('', onSuccess, onError);
        }
    });

    $.extend(BCFile.prototype, {
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
            this.attributes = attributes || {};
            delete this.files;

            if (this.attributes.type === 'folder') {
                var folder = this;
                folder.files = [];
                $.each(folder.attributes.contents, function(i, fileAttr) {
                    folder.files.push(new BCFile(folder.path + '/' + fileAttr.name, fileAttr));
                });
            }
        },

        fetch: EntityBase.fetch,
        save: EntityBase.save,
        remove: function(force, onSuccess, onError) {
            request('DELETE', this.contentUri() + '?force=' + !!force, null, applyCallback(this, onSuccess), onError);
            return this;
        },

        // Reads the contents from the (FTP) file
        read: function(onSuccess, onError) {
            fetch(this.contentUri(), onSuccess, onError, true);
            return this;
        },
        readDraft: function(onSuccess, onError) {
            fetch(this.draftUri(), onSuccess, onError, true);
            return this;
        },

        // Writes the contents to the (FTP) file
        write: function(contents, onSuccess, onError) {
            request('PUT', this.contentUri(), contents, applyCallback(this, onSuccess), onError, true);
            return this;
        },
        writeDraft: function(contents, onSuccess, onError) {
            request('PUT', this.draftUri(), contents, applyCallback(this, onSuccess), onError, true);
            return this;
        },
        removeDraft: function(onSuccess, onError) {
            request('DELETE', this.draftUri(), null, applyCallback(this, onSuccess), onError);
            return this;
        }
    });


    // =============================================================================================================

    var WebApp = BCAPI.WebApp = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(WebApp, {
        uri: function() { return 'webapps'; },
        setAttributes: EntityBase.setAttributes,

        create: FactoryBase.create,
        list: FactoryBase.list,
        get: function(name, onSuccess, onError) {
            return new this({name: name}).fetch(onSuccess, onError);
        },

        // Recreates a WebApp with its structure, fields, items and associated categories.
        createFromSchema: function(schema, onSuccess, onError) {
            onError = once(onError);

            BCAPI.log("Step 1: create WebApp and categories...");

            var step1Requests = 1 + schema.categories.length,
                step1Callback = after(step1Requests, step2);

            var webApp = WebApp.create(schema.webApp.attributes, step1Callback, onError);

            var categoriesMap = Category.listWithFullPath(function(map) {
                $.each(schema.categories, function(path) {
                    Category.createPathRecursive(path, map, step1Callback, onError);
                });
            }, onError);

            function step2() {
                BCAPI.log("Step 2: create fields and assign countries...");

                var fields = schema.webApp.fields,
                    hasCountries = !!schema.countries;

                var step2Requests = fields.length + (hasCountries ? 1 : 0),
                    step2Callback = after(step2Requests, step3);

                if (hasCountries) webApp.saveCountries(schema.countries, step2Callback, onError);

                $.each(fields, function(i, field) {
                    var fieldAttr = field.attributes;

                    // Convert WebApp <name> to <id> for fields with <type> = 'DataSource'
                    if (fieldAttr.dataSourceName) {
                        WebApp.get(fieldAttr.dataSourceName, function(dataSource) {
                            delete fieldAttr.dataSourceName;
                            fieldAttr.dataSourceId = dataSource.attributes.id;
                            WebAppField.create(webApp, fieldAttr, step2Callback, onError);
                        });
                    } else {
                        WebAppField.create(webApp, fieldAttr, step2Callback, onError);
                    }
                });
            }

            function step3() {
                BCAPI.log("Step 3: create items and assign categories...");

                var step3Requests = schema.items.length * 2,
                    step3Callback = after(step3Requests, done);

                $.each(schema.items, function(i, itemAttr) {
                    var itemCategories = itemAttr.categories;
                    delete itemAttr.categories;

                    var item = WebAppItem.create(webApp, itemAttr, step3Callback, onError);

                    // Convert category <path> to <id> and save
                    if (itemCategories.length) {
                        var categoryIds = [];
                        $.each(itemCategories, function(i, path) {
                            categoryIds.push(categoriesMap[path].attributes.id);
                        })
                        item.saveCategories(categoryIds, step3Callback, onError);
                    } else {
                        step3Callback();
                    }
                });
            }

            function done() {
                BCAPI.log("Done.");
                callOrLog(onSuccess)(webApp);
            }

            return webApp;
        },

        // Creates a schema object, containing the object graph describing a WebApp and all it's associated data.
        // Can be serialized to JSON and later imported with a call to WebApp.createFromSchema(schema)
        exportSchema: function(name, onSuccess, onError) {
            var schema = {},
                mapCategoryIdToPath;

            onError = once(onError);

            BCAPI.log("Step 1: WebApp with fields, countries, items and categories map...");

            var step1Callback = after(4, step2);

            schema.items = [];
            schema.categories = {};
            schema.webApp = WebApp.get(name, step1Callback, onError);
            schema.countries = schema.webApp.getCountries(step1Callback, onError);
            var paginatedItems = WebAppItem.find(schema.webApp, null, step1Callback, onError);

            Category.listWithFullPath(function(mapPathToObject, mapIdToPath) {
                mapCategoryIdToPath = mapIdToPath;
                step1Callback();
            }, onError);

            function step2() {
                BCAPI.log("Step 2: Item categories, map field.dataSourceId to dataSourceName...");

                schema.items = paginatedItems.items;
                var step2Callback = after(schema.items.length, step3);

                $.each(schema.webApp.fields, function(i, field) {
                    delete field.links;
                    delete field.webApp; // WebApp is already exposed, remove circular reference.
                });

                $.each(schema.items, function(i, item) {
                    item.categories = item.getCategories(step2Callback, onError);

                    var itemAttr = item.attributes;
                    delete itemAttr.id;
                    delete itemAttr.createDate;
                    delete itemAttr.lastUpdateDate;
                    delete item.links;
                    delete item.webApp; // WebApp is already exposed, remove circular reference.
                });

                var webAppAttr = schema.webApp.attributes;
                delete webAppAttr.id;
                delete webAppAttr.createBy;
                delete webAppAttr.createDate;
                delete webAppAttr.itemSystemFields;
                delete webAppAttr.lastUpdateBy;
                delete webAppAttr.lastUpdateDate;
                delete schema.webApp.links;

                if (!schema.items.length) step3();
            }

            function step3() {
                BCAPI.log("Step 3: Map category ids to path...");

                $.each(schema.items, function(i, item) {
                    $.each(item.categories, function(j, categoryId) {
                        var path = mapCategoryIdToPath[categoryId];
                        item.categories[j] = path;

                        // Count usage of each category
                        schema.categories[path] = (schema.categories[path] || 0) + 1;
                    });
                });

                BCAPI.log("Done.");
                callOrLog(onSuccess)(schema);
            }

            return schema;
        },

        // Recreates a WebApp with its structure, fields, items and associated categories
        // from a file previously created with WebApp.get("MyApp").exportToFile()
        importFromFile: function(filename, onSuccess, onError) {
            BCAPI.log('Importing WebApp from file "' + filename + '"...');

            if (filename.charAt(0) !== '/') {
                filename = '/Layouts/WebApps/' + filename + "/schema.json"
            }
            new BCFile(filename).read(function(schema) {
                WebApp.createFromSchema($.parseJSON(schema), onSuccess, onError);
            });
            return this;
        },

        importFromFiles: function(filenames, onSuccess, onError) {
            var webApps = {},
                callback = after(filenames.length, onSuccess);
            $.each(filenames, function(i, filename) {
                WebApp.importFromFile(filename, function(webApp) {
                    webApps[filename] = webApp;
                    callback(webApps);
                }, onError);
            });
            return webApps;
        },

        // Creates a File, accessible via FTP with the schema of the WebApp and its associated data.
        exportToFile: function(webAppName, onSuccess, onError, filename) {
            BCAPI.log('Exporting WebApp to file "' + filename + '"...');

            WebApp.exportSchema(webAppName, function(schema) {
                filename = filename || '/Layouts/WebApps/' + schema.webApp.attributes.name + "/schema.json";
                new BCFile(filename).write(JSON.stringify(schema), onSuccess, onError);
            });
            return this;
        }
    });

    $.extend(WebApp.prototype, {
        uri: function() {
            return WebApp.uri() + "/" + this.attributes.name;
        },
        countriesUri: function() {
            return this.uri() + "/countries";
        },

        fetch: EntityBase.fetch,
        // save() not implemented
        // delete() not implemented

        getCountries: function(onSuccess, onError) {
            return fetchList(this.countriesUri(), null, onSuccess, onError);
        },
        saveCountries: function(countries, onSuccess, onError) {
            request('PUT', this.countriesUri(), countries, onSuccess, onError);
            return this;
        },

        setAttributes: function(attributes) {
            this.attributes = attributes || {};
            delete this.fields;

            if (this.attributes.fields) {
                var webApp = this;
                webApp.fields = [];
                $.each(webApp.attributes.fields, function(i, fieldAttr) {
                    webApp.fields.push(new WebAppField(webApp, fieldAttr));
                });

                // Updating field information directly from a WebApp.save() is not supported
                delete webApp.attributes.fields;
            }
        }
    });


    // =============================================================================================================

    var WebAppField = BCAPI.WebAppField = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(WebAppField, {
        uri: function(webApp) {
            return webApp.uri() + "/fields";
        },

        create: function(webApp, attributes, onSuccess, onError) {
            var field = new this(attributes);
            request('POST', this.uri(webApp), attributes, applyAttributesAndCallback(field, onSuccess), onError);
            return field;
        },
        list: function(webApp, onSuccess, onError) {
            return fetchList(this.uri(webApp), function(attr) { return new WebAppField(webApp, attr); }, onSuccess, onError);
        },
        get: function(webApp, id, onSuccess, onError) {
            return new this(webApp, {id: id}).fetch(onSuccess, onError);
        }
    });

    $.extend(WebAppField.prototype, EntityBase, {
        uri: function() {
            return WebAppField.uri(this.webApp) + "/" + this.attributes.id;
        },
        setAttributes: EntityBase.setAttributes
    });


    // =============================================================================================================

    var WebAppItem = BCAPI.WebAppItem = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(WebAppItem, {
        uri: function(webApp) {
            return webApp.uri() + "/items";
        },

        create: function(webApp, attributes, onSuccess, onError) {
            var item = new this(attributes);
            request('POST', this.uri(webApp), attributes, applyAttributesAndCallback(item, onSuccess), onError);
            return item;
        },
        get: function(webApp, id, onSuccess, onError) {
            return new this(webApp, {id: id}).fetch(onSuccess, onError);
        },

        // Find items corresponding to the criteria specified in the <query> parameter.
        // The <query> can be either an URL query string or a key-value object.
        // TODO: pagination handling
        find: function(webApp, query, onSuccess, onError) {
            var uri = this.uri(webApp);
            if (query) uri += '?' + (typeof query === "object" ? $.param(query) : query);
            return fetchList(uri, function(attr) { return new WebAppItem(webApp, attr); }, onSuccess, onError, true);
        }
    });

    $.extend(WebAppItem.prototype, EntityBase, {
        uri: function() {
            return WebAppItem.uri(this.webApp) + "/" + this.attributes.id;
        },
        categoriesUri: function() {
            return this.uri() + "/categories";
        },
        setAttributes: EntityBase.setAttributes,

        getCategories: function(onSuccess, onError) {
            return fetchList(this.categoriesUri(), null, onSuccess, onError);
        },
        saveCategories: function(categories, onSuccess, onError) {
            request('PUT', this.categoriesUri(), categories, onSuccess, onError);
            return this;
        }
    });


    // =============================================================================================================

    var Category = BCAPI.Category = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(Category, {
        uri: function() { return 'categories'; },

        create: FactoryBase.create,
        list: FactoryBase.list,
        get: FactoryBase.get,

        // Checks if a category <path> exists and, if not, creates the needed categories.
        // The <onSuccess> callback will get the Category object as the first parameter.
        createPathRecursive: function(path, map, onSuccess, onError) {
            if (!map) {
                this.listWithFullPath(function(map) {
                    Category.createPathRecursive(path, map, onSuccess, onError)
                });
                return this;
            }

            var category = map[path];
            if (category) {
                callOrLog(onSuccess)(category);
                return this;
            }

            var parentPath = path.replace(/\/[^\/]+$/, ''),
                name = path.replace(/.*\//, '');
            if (parentPath) {
                Category.createPathRecursive(parentPath, map, function(parentCategory) {
                    map[path] = Category.create({name: name, parentId: parentCategory.attributes.id}, onSuccess, onError);
                });
            } else {
                map[path] = Category.create({name: name}, onSuccess, onError);
            }
            return this;
        },

        listWithFullPath: function(onSuccess, onError) {
            var mapIdToPath = {},
                mapPathToObject = {};

            function map(path, category) {
                mapIdToPath[category.attributes.id] = category.attributes.fullPath = path;
                mapPathToObject[path] = category;
            }

            this.list(function(categories) {

                // map level 0 categories
                $.each(categories, function(i, category) {
                    var attrs = category.attributes;
                    if (attrs.parentId === -1) {
                        var path = '/' + attrs.name;
                        map(path, category);
                    }
                });

                // map level 1..2 categories
                for (var l = 0; l < 2; l++) {
                    $.each(categories, function(i, category) {
                        var attr = category.attributes;
                        if (!mapIdToPath[attr.id] && mapIdToPath[attr.parentId]) {
                            var path = mapIdToPath[attr.parentId] + '/' + attr.name;
                            map(path, category);
                        }
                    });
                }

                callOrLog(onSuccess)(mapPathToObject, mapIdToPath);
            }, onError);

            return mapPathToObject;
        }
    });

    $.extend(Category.prototype, {
        uri: function() {
            return Category.uri() + "/" + this.attributes.id;
        },
        setAttributes: EntityBase.setAttributes,

        fetch: EntityBase.fetch
        // save() not implemented
        // delete() not implemented
    });


    // =============================================================================================================

    var Country = BCAPI.Country = function(attributes) {
        this.attributes = attributes;
    };

    $.extend(Country, {
        uri: function() { return '/api/v2/admin/system/countries'; },

        list: FactoryBase.list,
        listForIp: function(ip, onSuccess, onError) {
            ip = ip || 'current';
            return fetchList(
                this.uri() + '?ip=' + ip,
                function(attr) { return new Country(attr); },
                onSuccess, onError);
        }
    });


    // =============================================================================================================

    var Role = BCAPI.Role = function(attributes) {
        this.attributes = attributes;
    };

    $.extend(Role, {
        uri: function() { return 'roles'; },
        list: FactoryBase.list
    });


    // =============================================================================================================

    var Template = BCAPI.Template = function(attributes) {
        this.attributes = attributes;
    };

    $.extend(Template, {
        uri: function() { return 'templates'; },
        list: FactoryBase.list
    });


    // =============================================================================================================

    var Site = BCAPI.Site = function(attributes) {
        this.attributes = attributes;
    };

    $.extend(Site, {
        list: function(onSuccess, onError) {
            //noinspection JSUnusedAssignment
            authCookieUseGeneric = true;
            var list = fetchList('/api/v2/admin/sites', function(attr) { return new Site(attr); }, onSuccess, onError);
            authCookieUseGeneric = false;
            return list;
        },
        current: function(onSuccess, onError) {
            var site = new this();
            fetch('/api/v2/admin/sites/current', applyAttributesAndCallback(site, onSuccess), onError);
        }
    });

})(jQuery);