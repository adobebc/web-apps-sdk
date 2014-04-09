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

var WEBAPP_NAME = "bc-meet-the-team";
var WEBAPP_SLUG = "bc-meet-the-team";
var WEBAPP_PHOTO_FOLDER = "/bc-meet-the-team/images/";
var MEMBER_DEFAULT_PHOTO = WEBAPP_PHOTO_FOLDER + "generic-profile.jpg";

function bootStrap() {
    showPageLoadingIndicator(true);
    showInlineHelp();

    var webApp = new BCAPI.Models.WebApp.App({name: WEBAPP_NAME});
    webApp.fetch({
        success: loadTeamMembers,
        error: tryWebAppCreate
    });
    
    $(document).ready(function() {
    	initAppOnDocumentReady();
    });
}

function initAppOnDocumentReady() {
	_loadInstructions();
}

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
		console.log("bc-meet-the-team instructions are not found.");
	});
}

function _uninstallApplication() { 	
	var backendFolderPath = "/_System/apps/bc-meet-the-team",
		   frontendFolderPath = "/bc-meet-the-team",
		   redirected = false;
	
	var frontendFolder = new BCAPI.Models.FileSystem.Folder(frontendFolderPath);
	var backendFolder = new BCAPI.Models.FileSystem.Folder(backendFolderPath);
	var webapp = new BCAPI.Models.WebApp.App({"name": WEBAPP_NAME});

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
	
	if(window.parent) {
		window.parent.location = dashboardUrl;
	} else {
		window.location = dashboardUrl;
	}
}

function showInlineHelp() {

    if ($.cookie("sampleAppInlineHelpDismissed")){
        return;
    }

    $(".inlinehelp").show();

    $(".inlinehelp .close-btn").click( function(){
        $(".inlinehelp").hide();
        $.cookie("sampleAppInlineHelpDismissed", true, { expires: 365 });
    });
}

function loadTeamMembers(data) {
    var members = new BCAPI.Models.WebApp.ItemCollection(WEBAPP_NAME);
    members.fetch({
		order: "name",
        skip: 0,
        limit: 1000, //no pagination
        success: onMemberListFetch,
        error: onAPIError
    });
};

function tryWebAppCreate(data, xhr) {
    $.getJSON("assets/webapp.json")
        .done(function(webAppJsonDescriptor) {
            createWebApp(WEBAPP_NAME, webAppJsonDescriptor.webAppCustomFields, webAppJsonDescriptor.webAppSampleData, loadTeamMembers);    
        })
        .fail(function() {
            systemNotifications.showError("Could not load webapp definition file");
        });
}

function createWebApp(name, fields, sampleData, callback) {
    var webApp = new BCAPI.Models.WebApp.App({
        name: WEBAPP_NAME,
        slug: WEBAPP_SLUG,
        allowFileUpload: true,
        uploadFolder: WEBAPP_PHOTO_FOLDER
    });

    webApp.save({
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

/*
 * Event handlers for the list page
 */
function onMemberListFetch(data) {
    showPageLoadingIndicator(false);
    
    var templateText = $("#member-card-loading").html();
    
    _.each(data.models, function(member) {
        // First, add item to the view, with loading indicator
        var context = {"member": member};
    	var itemHtml = _.template(templateText, context);
        $("#team-members").append(itemHtml);
        
        // we need to fetch each item to get to the custom field
        member.fetch({
            success: onMemberListFetchSuccess,
            error: onAPIError
        });
    })
};

function onMemberListFetchSuccess(data) {
    var templateText = $("#member-card").html();
    if (data.get('fields').Picture == null || data.get('fields').Picture.length  == 0) {
        data.get('fields').Picture = MEMBER_DEFAULT_PHOTO;
    }
    var context = {"member": data};
    var itemHtml = _.template(templateText, context);
    
    var loadingCard = $("div[data-member-id=loading-" + data.get("id") +"]");
    if(loadingCard) {
        loadingCard.replaceWith(itemHtml)
    } else {
    $("#team-members").append(itemHtml);
    }
    
    // initialize clickover component
    $('a[rel="popover"]').clickover( {html: true});
    $(".card-actions").on("shown", persistActionsCard);
    $(".card-actions").on("hidden", restoreActionsCard);

};

function restoreActionsCard(evt, memberId) {
    var elementId;
    if (typeof evt != "undefined"){
        evt.stopPropagation();
        evt.preventDefault();
        elementId = evt.currentTarget.id;
    }
    else{
        elementId = "actions_" + memberId;
    }
    $("#" + elementId).attr("class", "card-actions");
}

function persistActionsCard(evt, memberId) {
    var elementId;
    if (typeof evt != "undefined"){
        evt.stopPropagation();
        evt.preventDefault();
        elementId = evt.currentTarget.id;
    }
    else{
        elementId = "actions_" + memberId;
    }
    $("#" + elementId).attr("class", "card-actions-persistent");
}

function disableActionsCard(memberId) {
    var elementId = "actions_" + memberId;
    $("#" + elementId).attr("class", "card-actions-disabled");
}

function enableActionsCard(memberId) {
    var elementId = "actions_" + memberId;
    $("#" + elementId).attr("class", "card-actions");
}

function onAPIError(data, xhr, options) {
    showPageLoadingIndicator(false);

    showErrorMessage(xhr, "API Error");
};

function deleteTeamMember(memberId) {

    var member = new BCAPI.Models.WebApp.Item(WEBAPP_NAME);
    member.id = memberId;

    var $memberDiv = $("div[data-member-id='" + member.id +"']");
    $memberDiv.children(".member-card").hide();    
    $memberDiv.append("<div class='member-loader'></div>");
    disableActionsCard(memberId);

    member.destroy({
        success: onMemberDeleteSuccess,
        error: function(data, xhr, options){
            onMemberDeleteError(memberId, data, xhr, options);
        }
    });
}

function onMemberDeleteSuccess(member) {
    $("div[data-member-id='" + member.id +"']").remove();
    systemNotifications.showSuccess('Deleted', 'Team member removed')
}

function onMemberDeleteError(memberId, data, xhr, options) {
    var $memberDiv = $("div[data-member-id='" + memberId +"']");
    $memberDiv.children(".member-card").show();
    $memberDiv.children(".member-loader").remove();
    enableActionsCard(memberId);

    onAPIError(data, xhr, options);
}

/*
 * Create / Edit page functions
 */

// store the reference to the selected file
// so we can do deferred upload, even from dnd
var userImageFile;

function previewImage(input) {
    if (input.files && input.files[0]) {
        userImageFile = input.files[0];
        $("#member-picture-name").val(userImageFile.name);
        var reader = new FileReader();
        reader.onload = function (e) {
            //the only jQuery line.  All else is the File API.
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    previewImage(evt.dataTransfer);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function onMemberDetailsFetch(member) {
    renderMemberDetailsForm(member);
}


function renderMemberDetailsForm(memberObject) {
    var templateText = $("#member-edit-form-template").html();

    var context = {"member": memberObject};
    $("#form-container").html(_.template(templateText, context));

    // show unknow image when the photo is missing
    if (memberObject.get('fields').Picture == null || memberObject.get('fields').Picture.length == 0) {
        $("#preview").attr("src", MEMBER_DEFAULT_PHOTO);
    }

    // Check for the various File API support.
    if ((typeof window.File == "undefined") 
        || (typeof window.FileReader == "undefined") 
        || (typeof window.FileList == "undefined")
        || (typeof window.Blob == "undefined")) {
        //we don't have needed File API support, hide file upload
        $('.upload-not-supported').show();
        $('.trigger-info').hide();
    }
    else {
        // setup file upload hooks for drag'n'drop
        // and client-side preview functionality
        $('.upload-not-supported').hide();

        $('#upload-trigger').click(function() {
            $('#member-picture-select').click();
        });
    }


    // Setup the dnd listeners
    var dropZone = document.getElementById('member-picture');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    // Attach form submit event handler

    $('#member-form-submit').click(onMemberFormSubmit);
    $("#member-form-cancel").click(onMemberFormLeave);

    $('.tab-pane input[type=text]').change(checkSocialTab);
    $.validator.messages.required = "This field is required";
    
}


function checkSocialTab(evt) {
    var inputId = evt.target.id;
    var socialTabId = inputId.replace("member", "tab");

    if ($("#" + inputId).val().length > 0) {
	    $("#" + socialTabId).addClass("checked");
    } else {
	    $("#" + socialTabId).removeClass("checked");
    }
}

function onMemberFormSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    enableButtons(false);
    showPageLoadingIndicator(true, true);

    $("#member-edit-form").validate({
        showErrors: function(errorMap, errorList) {

            $.each( this.successList , function(index, value) {
                $(value).popover('hide');
            });

            if (errorList.length > 0) {
	            var value = errorList[0];
                var _popover = $(value.element).popover({
                    trigger: 'manual',
                    placement: 'top',
                    content: "This field is required",
                    template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
                });

                _popover.data('popover').options.content = value.message;

                $(value.element).popover('show');

                enableButtons(true);
                showPageLoadingIndicator(false);
            }
        }
    });

    if ($("#member-edit-form").valid()) {
        saveMember(getMemberIdFromUrl());
    }
}

function saveMember(memberId) {
    var memberPicture = $("#member-picture-name").val();
    var member = new BCAPI.Models.WebApp.Item(WEBAPP_NAME);
    if (memberId) {
        member.set('id', memberId);
    }
    member.set({
        name: $('#member-name').val(),
        fields: {
            Position: $('#member-position').val(),
            Bio: $('#member-bio').val(),
            Facebook: $('#member-facebook').val(),
            Twitter: $('#member-twitter').val(),
            Linkedin: $('#member-linkedin').val(),
            Picture: MEMBER_DEFAULT_PHOTO
        }
    });

    if (userImageFile) {
        var memberImage = new BCAPI.Models.FileSystem.File({
    	    parent: new BCAPI.Models.FileSystem.Folder(WEBAPP_PHOTO_FOLDER),
    	    name: memberPicture
    	});
        if (memberPicture && memberPicture.length > 0) {
            member.get("fields").Picture = WEBAPP_PHOTO_FOLDER + memberPicture;
        }
        
        memberImage.upload(userImageFile)
            .done(function() {
                member.save({ contentType: 'application/json',
                    success: onMemberSaveSuccess,
                    error: onMemberSaveError
                })
            })
            .fail(onMemberUploadError);
    } else {
        if (memberPicture && memberPicture.length > 0) {
            member.get("fields").Picture = memberPicture;
        }

        member.save({
            success: onMemberSaveSuccess,
            error: onMemberSaveError
        });
    }
}

function onMemberUploadError(xhr, textStatus, errorThrown){
    enableButtons(true);
    showPageLoadingIndicator(false);

    showErrorMessage(xhr, "File Upload Error");
}

function onMemberSaveError(data, xhr, options){
    enableButtons(true);
    showPageLoadingIndicator(false);

    onAPIError(data, xhr, options);
}

function onMemberSaveSuccess(member) {
    showPageLoadingIndicator(false);

    systemNotifications.showSuccess("Operation successful", "Member details saved successfully");
    
    setTimeout(function() {
        onMemberFormLeave();
    }, 1000);
}

function onMemberFormLeave(evt) {
    window.location = 'index.html';
}

// enable - boolean desired state of buttons
function enableButtons(enabled) {
    $('.control-group .controls .btn').prop('disabled', !enabled);
}

function showErrorMessage(xhr, title) {
    var errorMessage = "Unknown error.";
    if (xhr.responseText) {
        errorMessage = "Server error. Error code: " + JSON.parse(xhr.responseText).code;
    }
    systemNotifications.showError( (typeof title != undefined) ? title : "Error", errorMessage);
}

// show - boolean show or hide loading indicator
function showPageLoadingIndicator(show, semiopaque){
    if (show){
        $(".loading").show(); // show the loading indicator
        if (semiopaque){
            $(".loading").addClass("semiopaque");
        }
        else{
            $(".loading").removeClass("semiopaque");
        }
    }
    else{
        $(".loading").hide(); // hide the loading indicator
    }
}

/*
 * Utility functions
 */

/* Function to read the query parameters from url*/

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getMemberIdFromUrl() {
    var queryParams = getUrlVars();
    return queryParams.memberid || null;
}
