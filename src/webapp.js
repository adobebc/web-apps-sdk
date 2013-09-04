(function($) {
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
    
})(jQuery);