var WEBAPP_NAME = "MeetTheTeam";
var WEBAPP_PHOTO_FOLDER = "/team/images/"
/*
 * Event handlers for the list page
 */
function onMemberListFetch(data) {
    $(".loading").hide(); // hide the loading indicator
    _.each(data.models, function(member) {
        // we need to fetch each item to get to the custom field
        member.fetch({
            success: onMemberFetch,
            error: onAPIError
        });
    })
};

function onMemberFetch(data) {
    var templateText = $("#member-card").html();
    var context = {"member": data, imageBase: WEBAPP_PHOTO_FOLDER};
    var itemHtml = _.template(templateText, context);
    $("#team-members").append(itemHtml);
    // initialize clickover component
    $('a[rel="popover"]').clickover( {html: true});

};

function onAPIError(errorMessage) {
    $(".loading").hide();
    systemNotifications.showError("API Error")
};

function deleteTeamMember(memberId) {
    var member = new BCAPI.Models.WebApp.Item(WEBAPP_NAME);
    member.id = memberId;
    member.destroy({
        success: onMemberDeleted,
        error: onAPIError()
    });
}

function onMemberDeleted(member) {
    $("div[data-member-id='" + member.id +"']").remove();
    systemNotifications.showSuccess('Deleted', 'Team member removed')
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
    var context = {"member": memberObject, imagePath: WEBAPP_PHOTO_FOLDER};
    $("#form-container").html(_.template(templateText, context));

    // setup file upload hooks for drag'n'drop
    // and client-side preview functionality

    $('#upload-trigger').click(function() {
        $('#member-picture-select').click();
    });

    // Setup the dnd listeners
    var dropZone = document.getElementById('member-picture');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    // Attach form submit event handler

    $('#member-edit-form').on('submit',onMemberFormSubmit);
}

function onMemberFormSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    saveMember(getMemberIdFromUrl());
}

function saveMember(memberId) {
    var memberPicture = $("#member-picture-name").val();
    var memberImage = new BCAPI.Models.FileSystem.File(WEBAPP_PHOTO_FOLDER, {name: memberPicture});
    var member = new BCAPI.Models.WebApp.Item(WEBAPP_NAME);
    member.set({
        id: memberId,
        name: $('#member-name').val(),
        fields: {
            Position: $('#member-position').val(),
            Bio: $('#member-bio').val(),
            Picture: memberPicture,
            Facebook: $('#member-facebook').val(),
            Twitter: $('#member-twitter').val(),
            Linkedin: $('#member-linkedin').val()
        }
    });

    if (userImageFile) {
        memberImage.upload(userImageFile).done(function() {
            member.save({
                success: onMemberSave,
                error: onAPIError
            });
        });
    } else {
        member.save({
            success: onMemberSave,
            error: onAPIError
        });
    }
}

function onMemberSave(member) {
    systemNotifications.showSuccess("Operation successful", "Member details saved successfully");
    window.location = 'index.html';
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