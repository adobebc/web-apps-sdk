var files = require("./files"),
	jsFiles = files.jsCoreFiles,
	webComponentFiles = files.webComponentFiles;

module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-vulcanize");

	grunt.initConfig({
		concat: {
			options: {
				separator: ""
			},
			dist: {
				files: {
					"dist/bcapi-full.js": jsFiles,
					"dist/bcapi-webcomponents-full.html": webComponentFiles
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			bcapi_dist: {
				files: {
					"dist/bcapi-full.min.js": ["dist/bcapi-full.js"]
				}
			}
		}
	});
};