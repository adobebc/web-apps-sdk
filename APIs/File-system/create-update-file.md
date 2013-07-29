## Create / Update a file

Uploads a file in a specified folder.

### Request

* **Method:** PUT
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/{siteId}/storage/{filePath}?version=draft
* **Auth Header:** Site token required
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
PUT https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/cat.jpg HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
~~~

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
