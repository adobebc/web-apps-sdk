describe('BCAPI.Models.WebApp', function() {
    
    var promiseScenario = BCAPI.Helper.Test.PromiseUtils.promiseScenario;
    var promiseFlag = BCAPI.Helper.Test.PromiseUtils.promiseFlag;
    var Item = BCAPI.Models.WebApp.Item;
    var ItemCollection = BCAPI.Models.WebApp.ItemCollection;

    var WEBAPP_NAME = 'WebApp_ItemIntegrationTest';
    var webApp = defaultWebApp();

    function defaultWebApp() {
        return new BCAPI.Models.WebApp.App({'name': WEBAPP_NAME});
    }

    beforeEach(function() {
        var p;
        BCAPI.Helper.Test.runTestServer();
        runs(function() {
            p = promiseFlag(webApp.destroy())
                .then(function() {
                    webApp = defaultWebApp();
                    return webApp.save();
                });
        });
        waitsFor(function() {
            return p.state() !== 'pending';
        }, 1000);
    });

    describe('BCAPI.Models.WebApp.Item', function() {

        it('should allow creating items', function() {
            var item = newItem('first-item');
            item.set('weight', 30);
            promiseScenario({
                'promise': function() {
                    return item.save()
                        .then(function() {
                            return retrieveByName('first-item');
                        });
                },
                'complete': function(retrieved) {
                    expect(retrieved.get('name')).toBe(item.get('name'));
                    expect(retrieved.get('weight')).toBe(30);
                },
                'message': 'Item creation is not succesful'
            });
        });

        it('should allow modifying items', function() {
            var item = newItem('updated-item');
            item.set('weight', 30);
            promiseScenario({
                'promise': function() {
                    return item.save()
                        .then(function() {
                            return retrieveByName('updated-item', true);
                        })
                        .then(function(stored) {
                            stored.set('weight', 40);
                            stored.set('description', 'my-description');
                            return stored.save();
                        })
                        .then(function() {
                            return retrieveByName('updated-item', true);
                        });
                },
                'complete': function(retrieved) {
                    expect(retrieved.get('weight')).toBe(40);
                    expect(retrieved.get('description')).toBe('my-description');
                },
                'message': 'Upload workflow failed'
            });
        });

        it('should allow deleting items', function() {
            var item = newItem('deleted-item');
            promiseScenario({
                'promise': function() {
                    return item.save()
                        .then(function() {
                            return retrieveByName('deleted-item');
                        })
                        .then(function(stored) {
                            return stored.destroy();
                        })
                        .then(function() {
                            return promiseFlag(retrieveByName('deleted-item'));
                        });
                },
                'complete': function(retrieved) {
                    expect(retrieved).toBe(false);
                }
            });
        });
        
    });

    describe('BCAPI.Models.WebApp.ItemCollection', function() {

        it('should perform the correct queries', function() {
            var count = 20;
            promiseScenario({
                'promise': function() {
                    return createMultiple(count, function(index) {
                        var item = newItem('col-item-' + (index <= 9 ? '0'+index : index));
                        item.set('weight', index);
                        return item;
                    }).then(function() {
                        var col = createCollection();
                        // selecting items [col-index-17 .. col-index-11]
                        return col.fetch({
                            'limit': 7,
                            'skip': 2,
                            'where': {
                                'weight': {
                                    '$gt': 9
                                }
                            },
                            'order': '-name'
                        }).then(function() {
                            return col;
                        });
                    });
                },
                'complete': function(col) {
                    expect(col.length).toBe(7);
                    for (var i = 0; i < 7; i++) {
                        var item = col.at(i);
                        var index = 17 - i;
                        expect(item.get('name')).toBe('col-item-' + index);
                        expect(item.get('weight')).toBe(index);
                    }
                }
            });
        });

        xit('should allow creation of items', function() {
            var col;
            var initialItemCount = 0;
            promiseScenario({
                'promise': function() {
                    return newItem('created-item-1').save()
                        .then(function() {
                            col = createCollection();
                            return col.fetch();
                        }).then(function() {
                            initialItemCount = col.length;
                            var p = $.Deferred();
                            col.on('sync', function() {
                                p.resolve(true);
                            });
                            col.create({
                                'name': 'created-item-2',
                                'description': 'some-description',
                                'weight': 42
                            });
                            return p;
                        }).then(function() {
                            return retrieveByName('created-item-2');
                        });
                },
                'complete': function(item) {
                    expect(initialItemCount).toBe(1);
                    expect(item.get('description')).toBe('some-description');
                    expect(item.get('weight')).toBe(42);
                },
                'message': 'Creating items using collection'
            });
        });

    });

    function newItem(name) {
        return new Item(webApp.get('name'), {'name': name});
    }

    function createCollection() {
        return new ItemCollection(webApp.get('name'));
    }

    function retrieveByName(name, withDetails) {
        var items = createCollection();
        var p = items.fetch({
            'limit': 1,
            'where': {
                'name': name
            }
        }).then(function() {
            if (items.length > 0) {
                return items.at(0);
            } else {
                var p = $.Deferred();
                p.reject();
                return p;
            }
        });
        if (withDetails) {
            return p.then(function(item) {
                return item.fetch().then(function() { return item; });
            });
        } else {
            return p;
        }
    }

    function createMultiple(count, creator) {
        var p = $.Deferred();
        var remaining = count;
        var decrement = function() {
            remaining--;
            if (!remaining) {
                p.resolve(true);
            }
        };
        for (var i = 0; i < count; i++) {
            var item = creator(i);
            item.save().done(decrement);
        }
        return p;
    }
});
