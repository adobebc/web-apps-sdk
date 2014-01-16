## Get upload progress through multipart request

Get the progress of the user's uploads.

**Note:** If the url for the POST request does not correspond to the datacenter where the site is located, a 301 response will be returned that will redirect the request to the correct location.

### Request

* **Method:** GET
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/storage?status
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
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
PUT /api/v2/admin/sites/current/storage?status=c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73 HTTPS/1.1
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
