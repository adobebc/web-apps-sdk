/*
 * grunt-bcapi-polymer-concat
 * https://github.com/adobebc/web-apps-sdk
 *
 * Copyright (c) 2015 Radu Viorel Cosnita
 * Licensed under the MIT license.
 */

'use strict';

var fs = require("fs");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bcapi_polymer_concat', 'Grunt plugin for cleaning production version of bcapi sdk by adding correct reference to webcomponents build.', 
    function() {
    var options = this.options(),
      jsFiles = options.jsFiles || [],
      webComponentFiles = options.webComponentFiles || [],
      concatenatedFiles = jsFiles.concat(webComponentFiles),
      jsDistFileName = options.jsDistFileName || "bcapi-full.js",
      componentsDistFileName = options.componentsDistFileName || "bcapi-webcomponents-full.html";

    this.files.forEach(function(f) {
      var srcFile = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!srcFile || srcFile.length === 0) {
        consoloe.log("No source files available.");

        return;
      }

      srcFile = srcFile[0];

      var body = fs.readFileSync(srcFile).toString();

      body = new FilesNormalizer(concatenatedFiles, jsDistFileName, componentsDistFileName).normalize(body);

      fs.writeFileSync(srcFile, body);

      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

  /**
   * This class provides the normalizer algorithm which can replace all files references pointing to non concatenated 
   * files to their correct normalized path.
   *
   * @class
   */
  function FilesNormalizer(concatenatedFiles, jsDistFileName, componentsDistFileName) { 
    this._concatenatedFiles = concatenatedFiles;
    this._jsDistFileName = jsDistFileName;
    this._componentsDistFileName = componentsDistFileName;

    this._fileTypes = {
      "js": this._jsDistFileName,
      "webcomponent": this._componentsDistFileName
    };

    this._compInlineReplacerPattern = "<script(.*)src=(\"|')%(filename)s\"></script>";
  };

  /**
   * This method takes care of concatenation process and stores the result in the internal properties.
   *
   * @private
   * @method
   */
  FilesNormalizer.prototype.normalize = function(body) {
    var self = this;

    this._concatenatedFiles.forEach(function(fileName) {
      var fileType = "js";

      if (fileName.indexOf(".html") === fileName.length - ".html".length) {
        fileType = "webcomponent";
      }

      if (fileName[0] !== "/") {
        fileName = "/" + fileName;
      }

      while (body.indexOf(fileName) > -1) {
        body = body.replace(fileName, self._fileTypes[fileType]);
      }

      if (fileType !== "webcomponent") {
        return;
      }

      body = self._replaceCompInlineJs(body, fileName);
    });

    return body;
  };

  /**
   * This method replace references to component javascript code with the inline script.
   *
   * @private
   * @method
   */
  FilesNormalizer.prototype._replaceCompInlineJs = function(body, fileName) {
    var potentialJsName = fileName.replace(".html", ".js");

    if (!grunt.file.exists(potentialJsName.substring(1))) {
      return body;
    }

    var jsBody = fs.readFileSync(potentialJsName.substring(1)).toString(),
      replacePattern = new RegExp(this._compInlineReplacerPattern.replace("%(filename)s", potentialJsName)),
      inlinePattern = "<script$1>" + jsBody + "</script>";

    body = body.replace(replacePattern, inlinePattern);

    return body;
  };
};