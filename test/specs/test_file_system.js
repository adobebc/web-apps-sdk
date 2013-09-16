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

        it('should change the path after the parent was changed', function() {
            var parent1 = new BcFolder('folder1');
            var parent2 = new BcFolder('folder2');
            var f = new BcFile({
                'parent': parent1,
                'name': 'file1'
            });
            expect(f).toHavePaths('/folder1/file1', '/folder1', 'file1');
            f.set('parent', parent2);
            expect(f).toHavePaths('/folder2/file1', '/folder2', 'file1');
        });

        it('should change the path after the name was succesfully synced', function() {
            var file = new BcFile('file1');
            file.set('name', 'file2');
            expect(file).toHavePaths('/file1', '/', 'file2');
            file.trigger('sync');
            expect(file).toHavePaths('/file2', '/', 'file2');
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

        it('should automatically add the "/" prefix to path if not already added', function() {
            expect(new BcFolder('my-folder/my-subfolder'))
                .toHavePaths('/my-folder/my-subfolder', '/my-folder', 'my-subfolder');
        });

        it('Folders should have the "type" property with value "folder" ', function() {
            expect(new BcFolder('/hello').get('type')).toBe('folder');
        });

        it('should properly parse the folder contents', function() {
            var contents = [
                {
                    'name': 'file1',
                    'type': 'file'
                },
                {
                    'name': 'folder1',
                    'type': 'folder'
                },
                {
                    'name': 'file2',
                    'type': 'file'
                }
            ];
            var f = new BcFolder('hello');
            var data = {'contents': contents};
            var parsed = f.parse(data).contents;
            expect(parsed[0]).toHavePaths('/hello/file1', '/hello', 'file1');
            expect(parsed[0].get('type')).toBe('file');
            expect(parsed[0] instanceof BcFile).toBe(true);

            expect(parsed[2]).toHavePaths('/hello/file2', '/hello', 'file2');
            expect(parsed[2].get('type')).toBe('file');
            expect(parsed[2] instanceof BcFile).toBe(true);
            
            expect(parsed[1]).toHavePaths('/hello/folder1', '/hello', 'folder1');
            expect(parsed[1].get('type')).toBe('folder');
            expect(parsed[1] instanceof BcFolder).toBe(true);
        });

        it('should not support save, destroy & fetch for the root directory', function() {
            var root = BCAPI.Models.FileSystem.Root;
            expect(function() { root.save(); }).toThrow();
            expect(function() { root.destroy(); }).toThrow();
        });
    });
});

