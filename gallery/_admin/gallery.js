// JavaScript Document

var IMAGES_PATH = '/gallery/images/';
var WEBAPP_NAME = 'Gallery';

$(function() {

    // update the page title
    parent.document.title = document.title;
    
    loadImages();
    $('#newItem').change(addImages);
    $('#trashIcon').click(initDeleteImage);
    $('#newItemButton').click(function() {
        $('#newItem').click();
    });
});

// begin image loading functions
function loadImages() {
    wadata = {};
    $('.allimages').html('');
    $('div.loading').show();
    $('div.empty').hide();
    
    // loads all the webapp items
    var items = new BCAPI.Models.WebApp.ItemCollection(WEBAPP_NAME);
    items.fetch({
        order: "weight",
        limit: 1000, // get all items
        success: loadImagesCB,
        error: createWebApp
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
            }
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
            success: imageDeleted
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
    _.imagesUploaded = _.after($('#newItem')[0].files.length*2, imagesUploaded);
    
    _.each($('#newItem')[0].files, function(file) {
        addImage(file);
    });
}

// upload individual image and create the webapp item
function addImage(file) {

    var path = IMAGES_PATH + file.name;

    // call the FS API to create the file
    
   	var fileModel = new BCAPI.Models.FileSystem.File(path);
    fileModel.upload(file).done(_.imagesUploaded);
    
    // call the WA Create API to create the WA Item
    var newItem = new BCAPI.Models.WebApp.Item(WEBAPP_NAME, {
        name: file.name,
        weight: wahelper.maxWeight,
        fields: {
            Image: path
        }
    });
    
    var response = newItem.save({
            success: _.imagesUploaded
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
function createWebApp() {
    var app = new BCAPI.Models.WebApp.App({
            name: WEBAPP_NAME
    });
    
    // create the web app
    app.save({
        success: function() {
            var customField = new BCAPI.Models.WebApp.CustomField(WEBAPP_NAME, {
                name: "Image",
                type: "Image"
            });
            
            // create the webapp "Image" custom fields
            customField.save({
                success: loadImages
            });
        }
    });
}