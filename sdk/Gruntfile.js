var files = require("./files"),
	jsFiles = files.jsCoreFiles,
	webComponentFiles = files.webComponentFiles;

module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.task.loadTasks("lib/grunt-bcapi-polymer-concat/tasks");

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
		bcapi_polymer_concat: {
			options: {
				jsFiles: jsFiles,
				webComponentFiles: webComponentFiles,
				jsDistFileName: "bcapi-full.js",
				componentsDistFileName: "bcapi-webcomponents-full.html"
			},
			default: {
				files: {
					"dist/bcapi-webcomponents-full.html": [ "dist/bcapi-webcomponents-full.html" ]
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