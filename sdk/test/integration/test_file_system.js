/* 
* 
* Copyright © 2016 Adobe. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
describe('BCAPI.Models.FileSystem', function() {

    var BcFile = BCAPI.Models.FileSystem.File;
    var BcFolder = BCAPI.Models.FileSystem.Folder;

    var SERVER_TIME_LAG = 3780 * 1000;

    var promiseScenario = BCAPI.Helper.Test.PromiseUtils.promiseScenario;
    var promiseFlag = BCAPI.Helper.Test.PromiseUtils.promiseFlag;

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
        this.addMatchers({
            toMatchEntity: function(entity) {
                var a = this.actual;
                return a.get('name') === entity.get('name') &&
                    a.get('path') === entity.get('path') &&
                    a.get('parent').get('path') === entity.get('parent').get('path');
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

        it('should create the parent directory when the file is created, if the parent didn\'t exist before', function() {
            var dirLevel1 = genDirName('dir_level_1_not_created_');
            var dirLevel2 = genDirName('dir_level_2_not_created_');
            var fileName = genFileName();
            var path = [dirLevel1, dirLevel2, fileName].join('/');
            var file = new BcFile(path);
            var folderLevel2 = file.get('parent');
            var folderLevel1 = folderLevel2.get('parent');
            var testStart = new Date();
            promiseScenario({
                'promise': function() {
                    return file.upload(randomString())
                        .then(function() { return folderLevel1.fetch(); })
                        .then(function() { return folderLevel2.fetch(); });
                },
                'complete': function() {
                    expect(folderLevel1.get('lastModified')).toBeLaterThan(testStart, SERVER_TIME_LAG);
                    expect(folderLevel2.get('lastModified')).toBeLaterThan(testStart, SERVER_TIME_LAG);
                    var contents1 = folderLevel1.get('contents');
                    expect(contents1.length).toBe(1);
                    expect(contents1[0]).toMatchEntity(folderLevel2);
                    var contents2 = folderLevel2.get('contents');
                    expect(contents2.length).toBe(1);
                    expect(contents2[0]).toMatchEntity(file);
                }
            });
        });

        it('should allow renaming a file', function() {
            var directory = new BcFolder(genDirName());
            var initialName = genFileName();
            var newName = genFileName();
            var f = directory.file(initialName);
            var data = randomString();
            var oldNameStilExists = false;
            var initialNameListed, newNameListed, renamingChangesListing, filePathChanged;
            var f3;
            function hasFile(dir, name) {
                return _.some(dir.get('contents'), function(f) {
                    return f.get('name') === name;
                });
            }
            promiseScenario({
                'promise': function() {
                    return f.upload(data)
                        .then(function() {
                            return directory.fetch();
                        })
                        .then(function() {
                            initialNameListed = hasFile(directory, initialName);
                            f.set('name', newName);
                            return f.save();
                        })
                        .then(function() {
                            return directory.fetch();
                        })
                        .then(function() {
                            renamingChangesListing = !hasFile(directory, initialName);
                            newNameListed = hasFile(directory, newName);
                            return promiseFlag(directory.file(initialName).fetch());
                        })
                        .then(function(result) {
                            if (typeof result !== 'boolean') {
                                throw new Error('Status does not have the expected type');
                            }
                            oldNameStilExists = result;
                            f3 = directory.file(newName);
                            filePathChanged = (f.get('path') === f3.get('path'));
                            return f3.fetch();
                        })
                        .then(function() {
                            return f3.download();
                        });
                },
                'complete': function(retrievedData) {
                    expect(retrievedData).toBe(data);
                    expect(initialNameListed).toBe(true);
                    expect(newNameListed).toBe(true);
                    expect(renamingChangesListing).toBe(true);
                    expect(filePathChanged).toBe(true);
                }
            });
        });

        it('should support names with spaces', function() {
            var fileName = genFileName('gen_ sp   - ');
            var file = new BcFile(fileName);
            var data = randomString();
            promiseScenario({
                'promise': function() {
                    return file.upload(data)
                        .then(function() {
                            return file.download();
                        });
                },
                'complete': function(downloadedData) {
                    expect(downloadedData).toBe(data);
                }
            });
        });
    });


    describe('BCAPI.Models.FileSystem.Folder', function() {

        it('should allow creating a new folder', function() {
            var name = genDirName();
            var d1 = new BcFolder(name);
            var d2 = new BcFolder(name);
            var testStartTime = new Date();
            promiseScenario({
                'promise': function() {
                    return d1.create().then(function() {
                        return d2.fetch();
                    });
                },
                'complete': function() {
                    expect(d2.get('lastModified')).toBeDefined();
                    expect(d2.get('contents')).toBeDefined();
                    expect(d2.get('lastModified')).toBeLaterThan(testStartTime, SERVER_TIME_LAG);
                }
            });
        });

        it('should retrieve the contained files & folders', function() {
            var d = new BcFolder(genDirName());
            var f1 = new BcFile({
                'parent': d,
                'name': 'file1'
            });
            var f2 = new BcFile({
                'parent': d,
                'name': 'file2'
            });
            var sd = new BcFolder({
                'parent': d,
                'name': 'subfolder'
            });
            promiseScenario({
                'promise': function() {
                    return d.create()
                        .then(function() { return sd.create(); })
                        .then(function() { return f1.upload(randomString()); })
                        .then(function() { return f2.upload(randomString()); })
                        .then(function() { return d.fetch(); });
                },
                'complete': function() {
                    expect(d.get('contents')).toBeDefined();
                    function sortModels(xs) { return _.sortBy(xs, function(x) { return x.get('path'); }); }
                    var expected = sortModels([f1, f2, sd]);
                    var retrieved = sortModels(d.get('contents'));
                    _.each(_.zip(expected, retrieved), function(p) {
                        var expectedModel = p[0];
                        var retrievedModel = p[1];
                        expect(expectedModel.get('path')).toBe(retrievedModel.get('path'));
                    });
                }
            });
        });

        it('should delete a folder', function() {
            var d = new BcFolder(genDirName('dir_deleted_'));
            promiseScenario({
                'promise': function() {
                    return d.create()
                        .then(function() { return d.fetch(); })
                        .then(function() { return d.destroy(); })
                        .then(function() {
                            return d.fetch().then(function() {
                                return true;
                            }, function() {
                                var p = $.Deferred();
                                p.resolve(false);
                                return p;
                            });
                        })
                },
                'complete': function(retrieved) {
                    expect(retrieved).toBe(false);
                }
            });
        });

        it('should delete all the contained files & folder when deleting a folder', function() {
            var folder = new BcFolder(genDirName('dir_deleted_'));
            var file = new BcFile({'parent': folder, 'name': 'del-file'});
            var subFolder = new BcFolder({'parent': folder, 'name': 'del-sub-folder'});
            var fileFound
            promiseScenario({
                'promise': function() {
                    var folderDestroyed = folder.create()
                        .then(function() { return file.upload(randomString()); })
                        .then(function() { return subFolder.create(); })
                        .then(function() { return folder.destroy(); });
                    var fileFoundP = folderDestroyed.then(function() {
                        return promiseFlag(file.fetch());
                    });
                    var subFolderFoundP = folderDestroyed.then(function() {
                        return promiseFlag(subFolder.fetch());
                    });
                    return fileFoundP.then(function(fileFound) {
                        return subFolderFoundP.then(function(subFolderFound) {
                            return {
                                'fileFound': fileFound,
                                'subFolderFound': subFolderFound
                            };
                        });
                    });
                },
                'complete': function(result) {
                    expect(result.fileFound).toBe(false);
                    expect(result.subFolderFound).toBe(false);
                }
            });
        });

        it('should not support save, destroy & fetch for the root directory', function() {
            var root = BCAPI.Models.FileSystem.Root;
            expect(function() { root.save(); }).toThrow();
            expect(function() { root.destroy(); }).toThrow();
        });

        it('should support fetch on root directory', function() {
            var root = BCAPI.Models.FileSystem.Root;
            expect(function() { root.fetch(); }).not.toThrow();
        });

        it('should allow renaming a folder', function() {
            var initialName = genDirName();
            var newName = genDirName();
            var fileName = genFileName();
            var folder = new BcFolder(initialName);
            var file = new BcFile({
                'parent': folder,
                'name': fileName
            });
            promiseScenario({
                'promise': function() {
                    return folder.create()
                        .then(function() {
                            return file.upload(randomString());
                        })
                        .then(function() {
                            folder.set('name', newName);
                            return folder.save();
                        })
                        .then(function() {
                            var newDir = new BcFolder(newName);
                            return newDir.fetch().then(function() { return newDir; });
                        });
                },
                'complete': function(newDir) {
                    expect(folder.get('path')).toBe(newDir.get('path'));
                    expect(_.where(newDir.get('contents'), {'name': fileName})).toBeTruthy();
                }
            });
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

        

        function genFile(directory) {
            directory = directory || BCAPI.Models.FileSystem.Root;
            var fileName = genFileName('file_');
            return directory.file(fileName);
        }

        function genDirName(prefix) {
            return genFileName(prefix || 'dir_');
        }

});
