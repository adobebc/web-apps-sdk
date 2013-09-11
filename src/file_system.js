(function($) {
	"use strict";

	//common model for files & folders
	var Entity = BCAPI.Models.Model.extend({
		'idAttribute': 'path',

		'endpoint': function() {
			return '/api/v2/admin/sites/current/storage';
		},

		'destroy': function() {
			throw new Error("Operation not supported");
		},

		'url': function() {
			var p = this.get('path');
			if (p[0] == '/') {
				p.substring(1);
			}
			return this.urlRoot() + p;
		}
	});
	

	var File = Entity.extend({
		'constructor': function(folder, attributes, options) {
			Entity.call(this, attributes, options);
			var folderPath =
				folder instanceof BCAPI.Models.FileSystem.Folder ? folder.get('path') : folder;
			this.set({
				'folderPath': folderPath,
				'path': folderPath + attributes.name,
				'type': 'file'
			});
		},

		'folder': function() {
			return new BCAPI.Models.FileSystem.Folder(this.get('folderPath'));
		},

		'save': function(attributes, options) {
			var additionalOptions = {
				'contentType': 'application/octet-stream',
				'type': 'PUT',
				'data': this.get('data'),
				'processData': false,
				'dataType': 'text'
			};
			var allOptions = _.extend(additionalOptions, options); 
			return Entity.prototype.sync.call(this, 'create', this, allOptions);
		}
	});

	var Folder = Entity.extend({
		'file': function(attributes, options) {
			return new File(this.get('path'), attributes, options);
		},

		/**
		 * Returns a promise containing the contents of
		 * this folder
		 * @return {promise} A promise containing the folders & files
		 *                   in this folder
		 */
		'list': function() {

		}
	});


	Folder.Root = new Folder({
		'path': '/'
	});

	BCAPI.Models.FileSystem = {
		'File': File,
		'Folder': Folder
	};

})(jQuery);

