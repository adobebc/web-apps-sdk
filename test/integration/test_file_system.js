describe('BCAPI.Models.FileSystem', function() {

    var BcFile = BCAPI.Models.FileSystem.File;
    var BcFolder = BCAPI.Models.FileSystem.Folder;

    var SERVER_TIME_LAG = 180 * 1000;

    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
        this.addMatchers({
            toBeLaterThan: function(date, errorMargin) {
                errorMargin = errorMargin || 0;
                var actual = this.actual.getTime();
                var compared = date.getTime();
                return actual >= (compared - errorMargin);
            }
        });
    });

    describe('BCAPI.Models.FileSystem.File', function() {
        'use strict';
        
        it('should allow to create a new file by uploading content', function() {
            var file = genFile();
            var content = randomString();
            var testStartTime = new Date();
            expect(file.get('type')).toBe('file');
            promiseScenario({
                'promise': function() {
                    return file.upload(content).then(function() { return file.fetch(); });
                },
                'complete': function() {
                    expect(file.get('lastModified')).toBeDefined();
                    expect(file.get('size')).toBeDefined();
                    expect(file.get('lastModified')).toBeLaterThan(testStartTime, SERVER_TIME_LAG);
                }
            });
        });

        it('should store the file under the specified path', function() {
            var file = genFile();
            var retrieved = new BcFile(file.get('path'));
            console.log('File has path ' + file.get('path'));
            var data = randomString();
            promiseScenario({
                'promise': function() {
                    return file.upload(data).then(function() {
                        return retrieved.fetch();
                    });
                },
                'complete': function() {
                    expect(retrieved.get('lastModified')).toBeDefined();
                }
            });
        });

        it('should download the same content that was uploaded', function() {
            var file = genFile();
            var content = randomString();
            promiseScenario({
                'promise': function() {
                    return file.upload(content).then(function() {
                        return file.download();
                    });
                },

                'complete': function(data) {
                    expect(data).toBe(content);
                }
            });
        });

        it('should delete files', function() {
            var file = genFile();
            promiseScenario({
                'promise': function() {
                    return file.upload(randomString()).then(function() {
                        return file.destroy().then(function() {
                            return file.fetch().then(function() {
                                return true;
                            }, function() {
                                var p = $.Deferred();
                                p.resolve(false);
                                return p;
                            });
                        });
                    });
                },
                'complete': function(wasRetrieved) {
                    expect(wasRetrieved).toBe(false);
                }
            });
        });

        it('should handle re-upload properly', function() {
            var file = genFile();
            var initialData = randomString();
            var newData = randomString();
            var creationTimestamp;
            promiseScenario({
                'promise': function() {
                    return file.uploadAndFetch(initialData)
                        .done(function() {
                            creationTimestamp = file.get('lastModified');
                        })
                        .then(function() {
                            return file.uploadAndFetch(newData).then(function() {
                                return file.download(); 
                            });
                        });
                },
                'complete': function(downloadedData) {
                    expect(downloadedData).toBe(newData);
                    expect(file.get('lastModified')).toBeLaterThan(creationTimestamp);
                }
            });
        });

        it('should store file contents in a location specific to each file', function() {
            var f1 = genFile(),
                f2 = genFile(),
                data1 = randomString(32),
                data2 = randomString(25);
            promiseScenario({
                'promise': function() {
                    var firstUploaded = f1.upload(data1);
                    var secondUploaded = f2.upload(data2);
                    var bothUploaded = firstUploaded.then(function() { return secondUploaded; });
                    var firstDownloaded = bothUploaded.then(function() { return f1.download(); }); 
                    var secondDownloaded = bothUploaded.then(function() { return f2.download(); });
                    return firstDownloaded.then(function(retrieved1) {
                        return secondDownloaded.then(function(retrieved2) {
                            return {
                                'first': retrieved1,
                                'second': retrieved2
                            };
                        });
                    });
                },
                'complete': function(result) {
                    expect(result.first).toBe(data1);
                    expect(result.second).toBe(data2);
                }
            });
        });
    });


    describe('BCAPI.Models.FileSystem.Folder', function() {

        it('should allow creating a new folder', function() {
            var name = genDirName();
            var d1 = new BcFolder(name);
            var d2 = new BcFolder(name);
            spyOn($, 'ajax').andCallThrough();
            promiseScenario({
                'promise': function() {
                    return d1.create().then(function() {
                        return d2.fetch();
                    });
                },
                'complete': function() {
                }
            });
        });

        it('should not support save, destroy & fetch for the root directory', function() {
            var root = BCAPI.Models.FileSystem.Root;
            expect(function() { root.save(); }).toThrow();
            expect(function() { root.destroy(); }).toThrow();
            expect(function() { root.fetch(); }).toThrow();
        });
        
        
    });


    // Utility functions
        
        function randChar() {
            var possibleChars = 'abcdefghijklmnopqrstuvwxyz';
            var index = Math.floor(Math.random() * possibleChars.length);
            return possibleChars[index];
        }

        function randomString(size) {
            size = size || 32;
            return _.times(size, randChar).join('');
        }

        function genFileName(prefix) {
            prefix = prefix || 'generated_'
            return prefix + randomString(12);
        }

        function promiseScenario(scenario) {
            var promiseFun = scenario.promise,
                promiseCompletion = scenario.complete,
                message = scenario.message || 'Promise in testing scenario',
                finished = false,
                success,
                result;
            runs(function() {
                var p = promiseFun();
                p.done(function(x) {
                    result = x;
                    finished = true;
                    success = true;
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log('Promise failed. Error status was: ' + textStatus + '. Error thrown was: ' + errorThrown);
                    finished = true;
                    success = false;
                });
            });
            waitsFor(function() { return finished; }, message, 5000);
            runs(function() {
                expect(success).toBeTruthy('Promise completion should be successful');
                if (success) {
                    promiseCompletion(result);  
                }
            });
        }

        function genFile(directory) {
            directory = directory || BCAPI.Models.FileSystem.Root;
            var fileName = genFileName('file_');
            return directory.file(fileName);
        }

        function genDirName(prefix) {
            return genFileName(prefix || 'dir_');
        }
});