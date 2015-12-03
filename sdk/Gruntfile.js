var files = require("./files"),
	cssFiles = files.cssFiles,
	jsFiles = files.jsCoreFiles,
	toCopyFiles = files.toCopyFiles,
	webComponentFiles = files.webComponentFiles;

module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.task.loadTasks("lib/grunt-bcapi-polymer-concat/tasks");

	grunt.initConfig({
		bcapi_polymer_concat: {
			options: {
				jsFiles: jsFiles,
				webComponentFiles: webComponentFiles,
				jsDistFileName: "bcapi-full.min.js",
				componentsDistFileName: "bcapi-webcomponents-full.html"
			},
			default: {
				files: {
					"dist/bcapi-webcomponents-full.html": [ "dist/bcapi-webcomponents-full.html" ]
				}
			}
		},
		clean: {
			dist: [ "dist" ],
			postbuild: [ "dist/fonts/fonts" ]
		},
		concat: {
			options: {
				separator: ""
			},
			dist_js: {
				files: {
					"dist/bcapi-full.js": jsFiles,
					"dist/bcapi-webcomponents-full.html": webComponentFiles
				}
			}
		},
		copy: {
			main: {
				files: toCopyFiles
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					"dist/bcapi-full.min.css": cssFiles
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

	grunt.registerTask("default", [ "clean:dist", "concat:dist_js", "uglify:bcapi_dist", "cssmin", 
			"bcapi_polymer_concat", "copy", "clean:postbuild" ]);
};