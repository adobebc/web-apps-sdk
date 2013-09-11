(function($) {
	"use strict";

	//common model for files & folders
	var Entity = BCAPI.Models.Model.extend({
		'idAttribute': 'path',

		'endpoint': function() {
			return '/api/v2/admin/sites/current/storage';
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

		'upload': function(data) {
			// var options = {
			// 	'contentType': 'application/octet-stream',
			// 	'type': 'PUT',
			// 	'data': data,
			// 	'processData': false,
			// 	'dataType': 'text'
			// };
			// return Entity.prototype.sync.call(this, 'create', this, options);
			return $.ajax(this.contentUrl(), {
				'contentType': 'application/octet-stream',
				'type': 'PUT',
				'data': data,
				'processData': false,
				'headers': this.headers()
			});
		},

		'uploadAndFetch': function(data) {
			var self = this;
			return this.upload(data).then(function() {
				return self.fetch();
			});
		},

		'download': function() {
			return $.ajax(this.contentUrl(), {
				'type': 'GET',
				'headers': this.headers()
			});
		},

		'save': function(attributes, options) {
			throw new Error('Operation not supported');
		},

		'parse': function(result) {
			//converting to a date object instead of the date string
			var dateStr = result.lastModified;
			result.lastModified = new Date(dateStr);
			return result;
		},

		'contentUrl': function() {
			return Entity.prototype.url.call(this);
		},

		'url': function() {
			return Entity.prototype.url.call(this) + '?meta';
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

