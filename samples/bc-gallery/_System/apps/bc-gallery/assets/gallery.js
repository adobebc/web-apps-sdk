/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/

// JavaScript Document

var IMAGES_PATH = '/bc-gallery/images/';
var WEBAPP_NAME = 'bc-gallery';
var GALLERY_DISMISSED_COOKIE = 'bcGalleryInlineHelpDismissed';

$(function() {    
    loadImages();
    $('#newItem').change(addImages);
    $('#trashIcon').click(initDeleteImage);
    $('#newItemButton').click(function() {
        $('#newItem').click();
    });
});

$(document).ready(function() {
	_loadInstructions();
});

function _loadInstructions() {
	var instructionsHolder = $("#tab-instructions");
	
	var request = $.ajax({
		"url": "templates/instructions.tpl",
		"contentType": "text/plain"
	});
	
	request.done(function(data) {
		instructionsHolder.html(data);
		
		$(instructionsHolder).find("button[data-sid='btn-uninstall-app']").click(_uninstallApplication);
	});
	
	request.fail(function(xhr, textStatus, err) {
		console.log("bc-gallery instructions are not found.");
	});
}

function _uninstallApplication() { 	
	var backendFolderPath = "/_System/apps/bc-gallery",
		   frontendFolderPath = "/bc-gallery",
		   redirected = false;
	
	var frontendFolder = new BCAPI.Models.FileSystem.Folder(frontendFolderPath);
	var backendFolder = new BCAPI.Models.FileSystem.Folder(backendFolderPath);
	var webapp = new BCAPI.Models.WebApp.App({"name": WEBAPP_NAME});

	$.removeCookie(GALLERY_DISMISSED_COOKIE);
	
	frontendFolder.destroy().always(function() {
		console.log(frontendFolderPath + " folder was completely removed.");
		
		if(!redirected) {
			redirected = true;
			_redirectToDashboard();			
		}			
	});
	
	backendFolder.destroy().always(function() {
		console.log(frontendFolderPath + " folder was completely removed.");
		
		if(!redirected) {
			redirected = true;
			_redirectToDashboard();			
		}		
	});
	
	webapp.destroy().always(function() {
		console.log(WEBAPP_NAME + " webapp was completely removed.");
		
		if(!redirected) {
			redirected = true;
			_redirectToDashboard();			
		}		
	});
}

function _redirectToDashboard() {
	var parentLocation = document.referrer,
		  dashboardUrl = parentLocation.substring(0, parentLocation.indexOf("/Admin")) + "/Admin/Dashboard_Business.aspx";
	
	window.parent.location = dashboardUrl;
}

// begin image loading functions
function loadImages() {
    wadata = {};
    $('.allimages').html('');    
    $('div.loading').show();
    $('div.empty').hide();

    _showAppHelper();
    
    // loads all the webapp items
    var items = new BCAPI.Models.WebApp.ItemCollection(WEBAPP_NAME);
    items.fetch({
        order: "weight",
        limit: 1000, // get all items
        success: loadImagesCB,
        error: createWebAppAndSampleData
    });
}

function _showAppHelper() {
    if ($.cookie(GALLERY_DISMISSED_COOKIE)) {
        return;
    }

    $('div.inlinehelp').show();    
    
    $('.inlinehelp .close-btn').click( function(){
        $('div.inlinehelp').hide();
        $.cookie(GALLERY_DISMISSED_COOKIE, true, { expires: 365 });
    });
}

// callback when the list of webapp items was retrieved
function loadImagesCB(data) {
    
    $('div.loading').hide();
    if (data.models.length == 0) {
        // if no items found
        $('div.empty').show();
        return;
    }
    
    // fix weight-related inconsistencies
    wadata = wahelper.fixWeightInconsistancies(data);

    // call the "doneLoading" function when all individual items have been fetched
    _.doneLoading = _.after(wadata.models.length, doneLoading);
    var i = 0;
    
    _.each(wadata.models, function(item) {
        var localI = i++;

        // get the fill items that includes all custom fields
        var fullItem = new BCAPI.Models.WebApp.Item(WEBAPP_NAME);
        fullItem.id = item.id;

        fullItem.fetch({
            success: function(item) {
                // update the local model (that did not include the custom fields) with the one with the custom fields
                wadata.models[localI] = item;
                _.doneLoading();
            },
            error: onAPIError
        });
    });
    
}

// callback when all individual items have been loaded
function doneLoading() {
    
    // using uderscore.js templating
    var templateText = $("#allimagesscript").html();
    
    _.each(wadata.models, function(item) {
        var context = {item: item};
        var itemHtml = _.template(templateText, context);
        $(".allimages").append(itemHtml);
    });

    // use jQuery sortable to handle drag and drop between items
    $('.allimages').sortable({
        start: wahelper.updateWeightings.start,
        update: function(event, ui) {
            wahelper.updateWeightings.update(event, ui, WEBAPP_NAME, doneSorting);
        }
    });
    
    $('.allimages li').mouseover(mouseOver).mouseout(mouseOut);
}
// end image loading functions

// callback after re-ordering elements (API calls) is done 
function doneSorting() {
    systemNotifications.showSuccess("Success", "Sorting updated.");
}

// on mouse over, show the trash icon
function mouseOver() {
    $(this).append($('#trashIcon'));
	$('#trashIcon').show();
}

// on mouse out, hide the trash icon
function mouseOut(){
	$('#trashIcon').hide();
}

// begin delete image functions
// when the user clicks the delete button
function initDeleteImage() {
    if (confirm("Are you sure you want to delete this image?")) {
        // this is the ID of the webapp item that was clicked
        var id = $(this).parent().attr('id').replace(/image_/, '');
        
        var imgSrc = $(this).parent().find('img').attr('src').replace(/\?.*$/, '');
        
		$('#trashIcon').hide();
	    $('body').append($('#trashIcon'));
        $('.allimages').html('');
        
        // physically delete the file
        var fileModel = new BCAPI.Models.FileSystem.File(imgSrc);
        fileModel.destroy();
        
        var itemToDelete = new BCAPI.Models.WebApp.Item(WEBAPP_NAME, {id: id});
        itemToDelete.destroy({
            success: imageDeleted,
            error: onAPIError
        });        
    }
}

// callback after the image was deleted
function imageDeleted() {
    systemNotifications.showSuccess("Success", "Image deleted.");
    loadImages();
}
// end delete image functions


// begin add image functions
// called when the user selected some images to upload
function addImages(e) {
    systemNotifications.showInfo("Loading...", "Uploading images.");
    
    // callback is called when after images upload and items created
    var callback = _.after($('#newItem')[0].files.length, imagesUploaded);
    
    _.each($('#newItem')[0].files, function(file) {
        addImage(file, callback);
    });
}

// upload individual image and create the webapp item
function addImage(file, callback) {
    var path = IMAGES_PATH + file.name;

    // call the FS API to create the file    
    var fileModel = new BCAPI.Models.FileSystem.File(path);
    fileModel.upload(file).done(function() {
        createWebappItem(file, path, callback);
    });
}

function createWebappItem(file, path, callback) {
    // call the WA Create API to create the WA Item
    var newItem = new BCAPI.Models.WebApp.Item(WEBAPP_NAME, {
        name: file.name,
        weight: wahelper.maxWeight,
        fields: {
            Image: path
        }
    });
    
    var response = newItem.save({
            success: callback,
            error: onAPIError
    });    
}

// callback when all images have been uploaded and all webapp items created
function imagesUploaded() {
    $('body').append($('#trashIcon'));
    systemNotifications.showSuccess("Success", "Images uploaded.");
    resetFormElement($('#newItem'));
    loadImages();
}

function resetFormElement(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();
}

// end add image functions

// init functions. Creates the webapp if not created
function createWebAppAndSampleData() {
    $.getJSON("assets/webapp.json")
        .done(function(webAppJsonDescriptor) {
            createWebApp(WEBAPP_NAME, webAppJsonDescriptor.webAppCustomFields, webAppJsonDescriptor.webAppSampleData, loadImages);
        })
        .fail(function() {
            systemNotifications.showError("Could not load webapp definition file");
        });
}

function createWebApp(name, fields, sampleData, callback) {
    var app = new BCAPI.Models.WebApp.App({
            name: name
    });

    app.save({
        success: function(app) {
            createCustomFields(app, fields, sampleData, callback);
        },

        error: function(data, xhr) {
            systemNotifications.showError("Could not create webapp");
        }
    })
}

function createCustomFields(webApp, fields, sampleData, successCallback) {
    var callAfterAllFieldsCreated = _.after(fields.length, function() {
        createSampleData(webApp, sampleData, successCallback);
    });

    _.each(fields, function(field) {
       var customField = new BCAPI.Models.WebApp.CustomField(webApp.get('name'), field);
        customField.save({
            success: callAfterAllFieldsCreated,
            error: function(data, xhr) {
                systemNotifications.showError("Failed to create custom field " + field.name);
            }
        })
    });
}

function createSampleData(webApp, sampleData, successCallback) {
    var callAfterSampleDataCreated = _.after(sampleData.length, successCallback);

    _.each(sampleData, function(member) {
        var webAppItem = new BCAPI.Models.WebApp.Item(webApp.get('name'), member);
        webAppItem.save({
            success: callAfterSampleDataCreated,
            error: function(data, xhr) {
                systemNotifications.showError("Failed to create sample data for " + field.name);
            }
        })
    });
}

function onAPIError(data, xhr, options) {
    var errorMessage = "Unknown error.";
    if (xhr.responseText) {
        errorMessage = "Server error. Error code: " + JSON.parse(xhr.responseText).code;
    }
    systemNotifications.showError("API Error", errorMessage);
};
