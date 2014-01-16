## Create / Update a file

Uploads a file in a specified folder.

### Request

* **Method:** PUT
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/storage/[filePath]?version=draft
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Can use SFTP & File Manager

#### Parameters ####

File contents as binary

### Response

Returns the status of the new file.

### Notes

Mandatory header `Content-Type: application/octet-stream`

**Datacenter location**

If the url for the PUT request does not correspond to the datacenter where the site is located, a 301 response will be returned that will redirect the request to the correct location. 

**Nested folders**

If you use a filePath with nested folders, the API will automatically create the nested folder structure.

The depth of the nested folder structure is limited only by the URL length.

The maximum URL length that can be used with PUT in the File API is: (TBD)\

**Query params**
 
The API supports an optional query param named version that as the following possible values:

* draft
  * If the file is a page, than a drat of it will be created/updated. The live version will not be touched.
	* If the file is not a page, than this will be ignored
* draft-publish
	* If the file in question is a page than the content will first be saved as a draft, overwriting the current one and a publish operation will be done at the end.
	* If the file in question is not a page, that this will be ignored. 

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT /api/v2/admin/sites/current/storage/images/cat.jpg HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://adobebc.github.io/bcapi.js/)

**Create a file in the root folder**

~~~
var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
var data = 'Hello World !';
f.upload(data).done(function() {
    console.log('File uploaded succesfully');
});
~~~

***

**Create file (specify the full path)**

~~~
var f = new BCAPI.Models.FileSystem.File('/hello_world.txt');
~~~

***

***Create a file (specify the parent folder)***

~~~
var f = new BCAPI.Models.FileSystem.File({
    'parent': new BCAPI.Models.FileSystem.Folder('/my/special'),
    'file': 'file'
});

f.upload(files[0]);
~~~

***

**Create a folder**

A folder object can be instantiated in two ways.

You can specify the path of the folder:

~~~
var folder = new BCAPI.Models.FileSystem.Folder('/folder/path');
~~~

You can also specify the name of the folder, and the parent directory:

~~~
var folder = new BCAPI.Models.FileSystem.Folder({
    'parent': BCAPI.Models.FileSystem.Root,
    'name': 'my-folder'
});
~~~

**Notes:**

* A file is created in your site's file system only after adding some content.
* The content can be any javascript object, including file objects obtained from html upload forms.
* BCAPI.Models.FileSystem.Root is the root folder in your site's file structure. You can also create a file object by specifying the file's full path.
* If you omit the `/` at the beginning of the file path, the system will add this.
* When creating a folder, only creating an instance of the folder class doesn't actually create the folder on the server. If the folder doesn't exist yet, a call to create is required.

### Error Codes

This method will return the following error codes:

* `200` - OK
* `301` - Redirect to correct data center url
* `400` - Bad request:
	* `104000` - Generic FileAPI error
	* `104002` - Not a file
	* `104003` - Not enough privileges 
	* `104004` - Invalid login multiple sites 
	* `104005` - Exceeded maximum file size 
	* `104006` - Invalid editable region name, if a template 
	* `104007` - Can't find tag {pagecontent} in editable region, if a template 
	* `104008` - Can't find tag {pagecontent}, if a template 
	* `104009` - Path not found
	* `104010` - Destination path not found 
	* `104012` - Web page in workflow updated, if trying to update a page in a workflow 
	* `104014` - Name required
	* `104015` - Invalid URL 
	* `104016` - Name not unique 
	* `104019` - Can't find folder 
	* `104022` - Destination exists 
	* `104023` - Unauthorized access 
	* `104028` - File or folder name too long 
* `401`- when authentication token is incorrect
