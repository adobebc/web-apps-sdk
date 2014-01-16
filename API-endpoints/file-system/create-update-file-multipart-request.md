## Create / Update files through multipart request

Uploads a one or more files in a given folder through a multipart POST action (like an HTML form). The login token is sent as a query parameter in the URL (We'll then be able to query for progress, based on that token).

### Request

* **Method:** POST
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/storage/[filePath]
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Can use SFTP & File Manager

#### Parameters ####

File contents as binary

### Response

Returns a status code

### Notes

Mandatory header: `Content-Type: application/octet-stream`

**Datacenter location**

If the url for the POST request does not correspond to the datacenter where the site is located, a 301 response will be returned that will redirect the request to the correct location.

**Nested folders**

If you use a path with nested folders, the API will automatically create the nested folder structure.

The depth of the nested folder structure is limited only by the URL length.The maximum URL length that can be used with POST in the File API is: (TBD)


### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT /api/v2/admin/sites/current/storage/images HTTPS/1.1
Accept: application/json
Authorization: 73370c2c02db48a6a6494c955f13abe48e4d11342fcc4f288eb1dfc79827e777
...(multipart request)...
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json
{"status": "success"}
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
