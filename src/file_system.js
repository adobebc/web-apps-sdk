(function($) {
    "use strict";

    //common model for files & folders
    var Entity = BCAPI.Models.Model.extend({
        'idAttribute': 'path',

        endpoint: function() {
            return '/api/v2/admin/sites/current/storage';
        },
        
        url: function() {
            var p = this.get('path');
            if (p[0] == '/') {
                p.substring(1);
            }
            return this.urlRoot() + p;
        }
    });

    function mkFilePath(dirPath, name) {
        if (dirPath[dirPath.length - 1] == '/') {
            return dirPath + name;
        } else {
            return dirPath + '/' + name;
        }
    }
    
    BCAPI.Models.FileSystem = {};

    /**
     * This class allows you to interact with files stored in your BC site.
     * Usage examples:
     *
     * ## Create a new file.
     * 
     * ```javascript
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * var data = 'Hello World !';
     * f.upload(data).done(function() {
     *     console.log('File uploaded succesfully');
     * });
     * ```
     *
     * A file is created in your site's file system only after uploading some
     * content.
     *
     * The content can be any javascript object, including file objects obtained
     * from html upload forms.
     *
     * BCAPI.Models.FileSystem.Root is the root folder in your site's
     * file structure. You can also create a file object by specifying
     * the file's full path.
     *
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File('/hello_world.txt');
     * ```
     *
     * If you omit the `/` at the beginning it will be added automatically.
     *
     * So the below is equivalent to the above instantiation:
     * ```javascript
     * var f = new BCAPI.Models.FileSystem.File('hello_world.txt');
     * ```
     *
     * ## Get the file metadata
     *
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.fetch().done(function() {
     *     console.log('File name is: ', f.get('name'));
     *     console.log('Last update date is: ', f.get('lastModified'));
     * });
     *
     * ## Download the file content
     *
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.download().done(function(content) {
     *     console.log('File content is: ' + content);
     * });
     *
     * ## Delete the file
     *
     * var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
     * f.destroy().done(function() {
     *     console.log('File was destroyed');
     * });
     * 
     */
    BCAPI.Models.FileSystem.File = Entity.extend({
        /**
         * Creates an instance of File.
         * @param  {string|BCAPI.Models.FileSystem.Folder} path File's parent directory (as Folder or string).
         *                                                      It can also be the file's full path if no name
         *                                                      is specified
         * @param  {object} attributes A hash of attributes for this file object
         * @param  {object} options    Option hash for this model
         */
        constructor: function(path, attributes, options) {
            Entity.call(this, attributes, options);
            var props = {};
            if (path instanceof BCAPI.Models.FileSystem.Folder) {
                props.folderPath = path.get('path');
                props.name = attributes.name;
            } else if (typeof path == 'string') {
                if (attributes && ('name' in attributes)) {
                    props.folderPath = path;
                    props.name = attributes.name;
                } else {
                    var split = path.lastIndexOf('/');
                    if (split == -1) {
                        props.folderPath = '/';
                        props.name = path;
                    } else {
                        props.folderPath = path.substring(0, split);
                        props.name = path.substring(split+1);
                    }
                }
            }
            if (props.folderPath && props.folderPath[0] != '/') {
                props.folderPath = '/' + props.folderPath;
            }
            props.type = 'file';
            props.path = mkFilePath(props.folderPath, props.name);
            this.set(props);
            if (!this.isValid()) {
                throw new Error('Invalid construction parameters');
            }
        },

        /**
         * Validates this File model
         * @param  {object} attr The attributes of the model
         * @return {string}      Returns a string with an error message if an error
         *                       has been found, or nothing otherwise.
         */
        validate: function(attr) {
            if (!attr.name) {
                return 'Invalid name for file';
            }
            if (!attr.folderPath) {
                return 'Invalid folder path';
            }
            if (!attr.path) {
                return 'Invalid path for file';
            }
        },

        /**
         * Returns the parent folder for this file.
         * @return {BCAPI.Models.FileSystem.Folder} the parent folder
         */
        folder: function() {
            return new BCAPI.Models.FileSystem.Folder(this.get('folderPath'));
        },

        /**
         * Uploads a new content for the file. This method can be called if the
         * file isn't yet created - the file will be created afterwards.
         * @param  {any} data the data object which will be the file's content
         * @return {promise}      a promise that will be completed when the file
         *                        is uploaded
         */
        upload: function(data) {
            return $.ajax(this.contentUrl(), {
                'contentType': 'application/octet-stream',
                'type': 'PUT',
                'data': data,
                'processData': false,
                'headers': this.headers()
            });
        },

        /**
         * Uploads new content and fetches the metadata for the file which will then
         * be used to populate the object. This method can be called even if the
         * file isn't created yet.
         * Useful if you want to create a file and retrieve it's metadata resulted
         * from the new content immediatly.
         * @param  {any} data The data object
         * @return {promise}      a promise that will be completed when the file
         *                        is uploaded and the new metadata is retrieved.
         */
        uploadAndFetch: function(data) {
            var self = this;
            return this.upload(data).then(function() {
                return self.fetch();
            });
        },

        /**
         * Downloads the content of the file
         * @return {promise} a promise which will be resolved with
         *                   the content of the file.
         */
        download: function() {
            return $.ajax(this.contentUrl(), {
                'type': 'GET',
                'headers': this.headers()
            });
        },

        save: function(attributes, options) {
            throw new Error('Operation not supported');
        },

        parse: function(result) {
            //converting to a date object instead of the date string
            var dateStr = result.lastModified;
            result.lastModified = new Date(dateStr);
            return result;
        },

        /**
         * Returns the URL where the file can be accessed.
         * @return {string} The file URL.
         */
        contentUrl: function() {
            return Entity.prototype.url.call(this);
        },

        /**
         * Returns the model URL - which will be used to retrieve & store metadata
         * @return {string} the model URL
         */
        url: function() {
            return Entity.prototype.url.call(this) + '?meta';
        }
    });

    BCAPI.Models.FileSystem.Folder = Entity.extend({
        file: function(attributes, options) {
            return new BCAPI.Models.FileSystem.File(this.get('path'), attributes, options);
        },

        /**
         * Returns a promise containing the contents of
         * this folder
         * @return {promise} A promise containing the folders & files
         *                   in this folder
         */
        list: function() {

        }
    });

    BCAPI.Models.FileSystem.Root = new BCAPI.Models.FileSystem.Folder({'path': '/'});

})(jQuery);

