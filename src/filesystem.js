(function($) {
	"use strict";
	
	/**
     * BC FileSystem APIs
     *
     * @constructor
     * @augments BCAPI.EntityCRUD
     */
    BCAPI.File = function(path, attributes) {
        if (path.charAt(0) !== '/') path = '/' + path;
        this.path = path;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.File, {
        create: function(path, content) {
            var file = new this(path);
            return file
                .write(content)
                .then(function() {
                    return file.fetch();
                });
        },
        get: function(path) {
            return new this(path).fetch();
        },
        root: function() {
            return this.get('');
        }
    });

    $.extend(BCAPI.File.prototype, BCAPI.EntityCRUD, {

        contentUri: function() {
            return 'storage' + this.path;
        },
        uri: function() {
            return this.contentUri() + "?meta";
        },
        draftUri: function() {
            return this.contentUri() + "?version=draft";
        },

        setAttributes: function(attributes) {
            delete this.files;
            if (attributes && attributes.type === 'folder') {
                var folder = this;
                folder.files = $.map(attributes.contents, function(fileAttr) {
                    return new BCFile(folder.path + '/' + fileAttr.name, fileAttr);
                });
            }

            return EntityBase.setAttributes.call(this, attributes);
        },

        remove: function(force) {
            return requestEntity(this, 'DELETE', this.contentUri() + '?force=' + !!force);
        },
        removeDraft: function() {
            return requestEntity(this, 'DELETE', this.draftUri() + '?force=' + !!force);
        },

        // Reads the contents from the (FTP) file
        read: function() {
            return requestEntity(this, 'GET', this.contentUri(), null, true);
        },
        readDraft: function() {
            return requestEntity(this, 'GET', this.draftUri(), null, true);
        },

        // Writes the contents to the (FTP) file
        write: function(contents) {
            return requestEntity(this, 'PUT', this.contentUri(), contents, true);
        },
        writeDraft: function(contents) {
            return requestEntity(this, 'PUT', this.draftUri(), contents, true);
        }
    });
})(jQuery);