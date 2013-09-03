module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-jsdoc');
	
	grunt.initConfig({
	    jsdoc : {
	        dist : {
	            src : ["src/*.js", "README.md"],
	            options : {
	            	destination : "doc"
	            }
	        }
	    }
    });
};