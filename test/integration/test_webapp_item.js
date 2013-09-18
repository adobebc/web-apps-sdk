describe('BCAPI.Models.WebApp', function() {
    
    var promiseScenario = BCAPI.Helper.Test.PromiseUtils.promiseScenario;
    var promiseFlag = BCAPI.Helper.Test.PromiseUtils.promiseFlag;
    var Item = BCAPI.Models.WebApp.Item;

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

    function newItem(name) {
        return new Item(webApp.get('name'), {'name': name});
    }

    function retrieveByName(name, withDetails) {
        var items = new BCAPI.Models.WebApp.ItemCollection(webApp.get('name'));
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
});
