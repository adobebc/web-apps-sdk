## Delete Web App Item

Delete a web app item.

### Request

* **Method:** DELETE
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webAppName]/items/[webAppItemId]
  * Alternatively, use "current" instead of {siteId}
* **Auth Header:** Site token required
* **Required Permissions:** Delete Web App Items

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
Delete /api/v2/admin/sites/123/webapps/TestWebapp1/items/123
Authorization: 3e8d891d91eb433e9c800cebe3b132a4e64ac661c5ed4dd8bdecae0487e4ad7c
Content-Type: application/json
Accept: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the authentication token is incorrect
* `403` - forbidden - when the user does not have the proper permissions
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `200001` - The webapp item was not found (the webAppName and webAppItemId from the URL do not match)
* `400` - bad request; sub-error codes:
	* `200000` - An unspecified error has occured
