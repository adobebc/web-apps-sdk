describe('BCAPI.Models.FileSystem', function() {
    'use strict';

    var BcFile = BCAPI.Models.FileSystem.File;
    var BcFolder = BCAPI.Models.FileSystem.Folder;

    beforeEach(function() {
        this.addMatchers({
            toHavePaths: function(path, parentPath, name) {
                var x = this.actual;

                this.message = function() {
                    var expected = {
                        'path': path,
                        'parentPath': parentPath,
                        'name': name
                    };
                    var actual = {
                        'path': x.get('path'),
                        'parentPath': x.get('parent').get('path'),
                        'name': x.get('name')
                    };
                    return 'Expected paths ' + JSON.stringify(actual) +
                        ' to be ' + JSON.stringify(expected);
                };

                return x.get('path') === path &&
                    x.get('parent').get('path') === parentPath &&
                    x.get('name') === name;
            }
        });
    });

    describe('BCAPI.Models.FileSystem.File', function() {

        it('should allow instantiation by path', function() {
            expect(new BcFile('/hello/world'))
                .toHavePaths('/hello/world', '/hello', 'world');
        });

        it('should automatically add the root slash', function() {
            expect(new BcFile('folder/file'))
                .toHavePaths('/folder/file', '/folder', 'file');
        });

        it('should allow instantiation be specifying parent & name', function() {
            var f = new BcFile({
                'parent': new BcFolder('/folder/path'),
                'name': 'file-name'
            });
            expect(f).toHavePaths('/folder/path/file-name', '/folder/path', 'file-name');
        });

        it('should throw an error for invalid instantiation parameters', function() {
            expect(function() { new BcFile(); }).toThrow();
            expect(function() { new BcFile('/'); }).toThrow();
            expect(function() { new BcFile({'name': 'hello'});}).toThrow();
        });

        it('should have the "type" property with value "file"', function() {
            expect(new BcFile('/myfile').get('type')).toBe('file');
        });
    });

    describe('BCAPI.Models.FileSystem.Folder', function() {

        it('should allow instantiation using name in constructor arg', function() {
            expect(new BcFolder('/my-folder'))
                .toHavePaths('/my-folder', '/', 'my-folder');
        });

        it('should allow instantiation using path in attributes', function() {
            expect(new BcFolder('/folder/path'))
                .toHavePaths('/folder/path', '/folder', 'path');
        });

        it('should allow instantiation using a parent folder and a name', function() {
            var d = new BcFolder({
                'parent': new BcFolder('/parent/folder'),
                'name': 'child'
            });
            expect(d).toHavePaths('/parent/folder/child', '/parent/folder', 'child');
        });

        it('Folders should have the type property "folder" ', function() {
            expect(new BcFolder('/hello').get('type')).toBe('folder');
        });

        it('should not support save, destroy & fetch for the root directory', function() {
            var root = BCAPI.Models.FileSystem.Root;
            expect(function() { root.save(); }).toThrow();
            expect(function() { root.destroy(); }).toThrow();
            expect(function() { root.fetch(); }).toThrow();
        });
    });
});

