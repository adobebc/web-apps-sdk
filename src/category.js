(function($) {
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
                return BCAPI.chain(path, function(p) {
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
	
})(jQuery);