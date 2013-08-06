## Get upload progress through multipart request

Get the progress of the user's uploads.

**Note:** If the url for the POST request does not correspond to the datacenter where the site is located, a 301 response will be returned that will redirect the request to the correct location.

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/{siteId}/storage?status
* **Auth Header:** Site token required
* **Required Permissions:** Can use SFTP & File Manager

#### Parameters ####

File contents as binary

### Response

Returns `percent: 'value'` - an integer value between 0 and 100

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage?status=c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73 HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json
{"percent":100}
~~~

### Error Codes

This method will return the following error codes:

* `200` - OK
* `301` - Redirect to correct data center url
* `400` - Bad request:
  * `104000` - Generic FileAPI error
	* `104001` - File not found
	* `104002` - Not a file
	* `104003` - Not enough privileges
* `401`- when authentication token is incorrect
