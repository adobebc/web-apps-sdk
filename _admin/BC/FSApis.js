// JavaScript Document

fs = {};

// file upload
fs.upload = function(file, path, callback) {
	$.ajax({
        url: 'https://' + window.parent.authData.apiUrl + '/api/v2/admin/sites/current/storage' + path,
        type: 'PUT',
        success: callback,
        error: function(xhr, errTxt, errObj) { throw errObj; },
        beforeSend: fs.setHeader,
        processData: false,
        data: file
    });
}

// file delete
fs.delete = function(path, callback) {
	$.ajax({
        url: 'https://' + window.parent.authData.apiUrl + '/api/v2/admin/sites/current/storage' + path,
        type: 'DELETE',
        success: callback,
        error: function(xhr, errTxt, errObj) { throw errObj; },
        beforeSend: fs.setHeader,
    });
}

// sets auth header and content type
fs.setHeader = function(xhr) {
    xhr.setRequestHeader("Authorization", $.cookie('siteAuthToken'));
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
};