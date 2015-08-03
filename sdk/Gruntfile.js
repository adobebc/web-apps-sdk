var srcFiles = require("./files");

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.initConfig({
		concat: {
			options: {
				separator: ";"
			},
			dist: {
				src: srcFiles,
				dest: "dist/bcapi-full.js"
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