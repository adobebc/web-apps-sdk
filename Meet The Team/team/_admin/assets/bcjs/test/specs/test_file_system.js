describe('BCAPI.Models.FileSystem.File', function() {
    'use strict';

    var BcFile = BCAPI.Models.FileSystem.File;
    var BcFolder = BCAPI.Models.FileSystem.Folder;


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