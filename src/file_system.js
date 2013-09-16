(function($) {
    'use strict';

    function getParent(x) {
        return x == '/' ? BCAPI.Models.FileSystem.Root : new BCAPI.Models.FileSystem.Folder(x);
    }

    //common model for files & folders
    var Entity = BCAPI.Models.Model.extend({
        'idAttribute': 'path',

        constructor: function(a1, a2, a3) {
            var attributes, options, initialProps = {};
            if (typeof a1 === 'string') {
                attributes = a2;
                options = a3;
                var path = $.trim(a1);
                if (path == '/') {
                    throw new Error('Cannot instantiate the "/" folder like this. Use BCAPI.Models.FileSystem.Root instead');
                } 
                var o = splitPath(path);
                initialProps.parent =  getParent(o.parent);
                initialProps.name = o.name;
            } else {
                attributes = a1;
                options = a2;
            }
            BCAPI.Models.Model.call(this, attributes, options);
            if (initialProps) {
                this.set(initialProps);
            }
            this._refreshPath();
            var model = this;
            this.on('change:parent sync', function() {
                model._refreshPath();
            });
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/storage';
        },
        
        url: function() {
            return this.contentUrl() + '?meta';
        },

        /**
         * Returns the url where the content can be accessed.
         * @return {string} The URL of the resource
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        contentUrl: function() {
            var p = this.get('path');
            if (p[0] == '/') {
                p.substring(1);
            }
            return this.urlRoot() + p;
        },

        validate: function(attr) {
            if (!attr.name || typeof attr.name !== 'string') {
                return 'Invalid name for file: [' + attr.name + ']';
            }
            if (!attr.path) {
                return 'Invalid path for file: [' + attr.path + ']';
            }
        },

        parse: function(result) {
            //converting to a date object instead of the date string
            var dateStr = result.lastModified;
            result.lastModified = new Date(dateStr);
            return result;
        },

        toJSON: function() {
            //only name should be persisted. Other attributes are calculated
            return _.pick(this.attributes, 'name');
        },

        //recomputes the path attribute. Useful to call when parent or name have changed
        _refreshPath: function() {
            this.set('path', mkFilePath(this.get('parent').get('path'), this.get('name')));
        }
    });

    function mkFilePath(dirPath, name) {
        if (dirPath[dirPath.length - 1] == '/') {
            return dirPath + name;
        } else {
            return dirPath + '/' + name;
        }
    }

    function splitPath(path) {
        var parent, name,
            index = path.lastIndexOf('/');
        if (index < 0) {
            name = path;
        } else {
            parent = path.substring(0, index);
            name = path.substring(index + 1);
        }
        if (!parent) {
            parent = '/';
        }
        return {
            'parent': parent,
            'name': name
        };
    }

    /**
     * @namespace BCAPI.Models.FileSystem
     */
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
     * @class
     * @name File
     * @memberOf BCAPI.Models.FileSystem
     * 
     */
     BCAPI.Models.FileSystem.File = Entity.extend({

        /**
         * Returns the parent folder for this file.
         * @return {BCAPI.Models.FileSystem.Folder} the parent folder
         * @memberOf BCAPI.Models.FileSystem.File
         * @method
         * @instance
         */
        folder: function() {
            return this.get('parent');
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


        initialize: function() {
            this.set('type', 'file');
        }
    });

    BCAPI.Models.FileSystem.Folder = Entity.extend({

        file: function(name, attributes, options) {
            var fullAttributes = _.extend({'parent': this, 'name': name}, attributes);
            return new BCAPI.Models.FileSystem.File(fullAttributes, options);
        },

        initialize: function() {
            this.set('type', 'folder');
        },

        /**
         * Creates the specified folder
         * @return {promise} A promised that will be resolved when the folder is created
         */
        create: function() {
            return $.ajax(this.contentUrl() + '?type=folder', {
                'type': 'PUT',
                'processData': false,
                'headers': this.headers()
            });
        },

        parse: function(result) {
            var items = Entity.prototype.parse.call(this, result);
            var parent = this;
            var models = _.map(items.contents, function(obj) {
                obj.parent = parent;
                if (obj.type === 'file') {
                    return new BCAPI.Models.FileSystem.File(obj);
                } else if (obj.type === 'folder') {
                    return new BCAPI.Models.FileSystem.Folder(obj);
                }
            });
            items.contents = models;
            return items;
        }
    });

    var Root = BCAPI.Models.FileSystem.Folder.extend({
        constructor: function() {
            BCAPI.Models.Model.call(this);
            this.set({
                'path': '/',
                'name': '',
                parent: null
            });
        },

        validate: function() { },

        save: function() {
            throw new Error('Operation not supported');
        },

        destroy: function() {
            throw new Error('Operation not supported');
        }

    });

    BCAPI.Models.FileSystem.Root = new Root();

})(jQuery);

