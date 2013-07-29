## Get file

Get a file.

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/{siteId}/storage/{filePath}?version=draft
* **Auth Header:** Site token required
* **Required Permissions:** Can use SFTP & File Manager

### Response

Returns the content of a file.

### Notes

**Optional query parameters**

The API supports an optional query parameter, version with the following values:

* draft
  * If the file is a page
		* If the page has a draft, than that content will be returned
		* If the page does not have a draft than the live content will be returned
	* If the file is not a page, than this will be ignored

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/cat.jpg HTTPS/1.1
Connection: keep-alive
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Length: 1024
Last-Modified: Mon, 26 Jul 2010 12:45:26 GMT
 
Body: file contents as binary
~~~

### Error Codes

This method will return the following error codes:

* `200` - OK
* `400` - Bad request:
	* `104000` - Generic FileAPI error
	* `104001` - File not found
	* `104002` - Not a file
	* `104003` - Not enough privileges
	* `104004` - Invalid login multiple sites - 
	* `104009`- Path not found - 
	* `104014` - Name required - 
	* `104019` - Can't find folder - 
	* `104023` - Unauthorized access - 
	* `104024` - Folder not empty - 
	* `104004` - File or folder name too long 
* `401`- when authentication token is incorrect
* `404` - the file does not exist
