(function() {
    var BcFile = BCAPI.Models.FileSystem.File;
    var BcFolder = BCAPI.Models.FileSystem.Folder;

    describe('BCAPI.Models.FileSystem.File', function() {
        'use strict';

        it('should allow instantiation by path', function() {
            var f = new BcFile('/hello/world');
            expect(f.get('path')).toBe('/hello/world');
            expect(f.get('name')).toBe('world');
            expect(f.get('folderPath')).toBe('/hello');
        });

        it('should automatically add the root slash', function() {
            var f = new BcFile('folder/file');
            expect(f.get('path')).toBe('/folder/file');
            expect(f.get('name')).toBe('file');
            expect(f.get('folderPath')).toBe('/folder');
        });

        it('should allow instantiation with folder path and file name', function() {
            var f = new BcFile('/folder/path', {'name': 'file-name'});
            expect(f.get('path')).toBe('/folder/path/file-name');
            expect(f.get('name')).toBe('file-name');
            expect(f.get('folderPath')).toBe('/folder/path');
        });

        it('should allow instantiation with folder and file name', function() {
            var d = new BcFolder({'path': '/folder/path'});
            var f = new BcFile(d, {'name': 'file'});
            expect(f.get('path')).toBe('/folder/path/file');
            expect(f.get('name')).toBe('file');
            expect(f.get('folderPath')).toBe('/folder/path');
        });

        it('should throw an error for invalid instantiation parameters', function() {
            // var d = new BcFolder({'path': ''})
            // expect(function() { new BcFile()})
        });
    });

    describe('BCAPI.Models.FileSystem.File', function() {

        it('should allow instantiation using name in constructor arg', function() {
            var d = new BcFolder('/my-folder');
            expect(d.get('path')).toBe('/my-folder');
            expect(d.get('name')).toBe('my-folder');
        });

        it('should allow instantiation using path in attributes', function() {
            var d = new BcFolder('/folder/path');
            expect(d.get('path')).toBe('/folder/path');
            expect(d.get('name')).toBe('path');
        });

        it('should allow instantiation using a parent folder and a name', function() {
            var parent = new BcFolder('/parent/folder');
            var child = new BcFolder(parent, {'name': 'child'});
            expect(child.get('path')).toBe('/parent/folder/child');
            expect(child.get('name')).toBe('child');
        });

    });
})();

