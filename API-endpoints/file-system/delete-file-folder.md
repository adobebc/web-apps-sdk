## Delete file or folder

Delete a file or folder.

**Note:** Deleting a parent folder will automatically delete its contents

### Request

* **Method:** DELETE
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/{siteId}/storage/{path}?version=draft&force=true|false
* **Auth Header:** Site token required
* **Required Permissions:** Can use SFTP & File Manager

#### Optional query params

| Param name | Values | Description |
| ------------- | ------------- | ------------- |
| version | draft | If the page has a draft version, then the draft will be deleted. If it is a folder or not a page, than it will be ignored
| force | true, false | In case of folders, a value of false prevents folder delete if the folder is not empty. Error throws is 403, with sub error code 104024 |

### Response

Returns a status Code

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
DELETE https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/cat.jpg HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/APIs/javascript-SDK.html)

**Delete a file**

~~~
var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
f.destroy().done(function() {
    console.log('File was destroyed');
});
~~~

**Delete a folder**

~~~
var folder = new BCAPI.Models.FileSystem.Folder('/my-folder');
folder.destroy().done(function() {
    console.log('Folder was deleted');
});
~~~

### Error Codes

This method will return the following error codes:

* `200` - OK
* `400` - Bad request:
  * `104000` - Generic FileAPI error
	* `104001` - File not found
	* `104003` - Not enough privileges
	* `104004` - Invalid login multiple sites
	* `104009`- Path not found
	* `104010` - Destination path not found
	* `104011` - Web page in workflow deleted, if trying to delete a page in workflow
	* `104014` - Name required
	* `104020` - Folder reserved
	* `104023` - Unauthorized access
	* `104024` - Folder not empty
* `401`- when authentication token is incorrect
* `403` - sub error code 104024 when false flag was set to false, and you are attempting to delete a folder that is not empty
* `404` - resource does not exist
