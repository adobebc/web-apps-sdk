## Logout for Site Token

Performs a logout for a site token

### Request

* **Method:** DELETE
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteid]/tokens
	* Alternatively, use 'current' instead of siteId
* **Auth Header:** Site token required

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
DELETE /api/v2/admin/tokens HTTPS/1.1
Host: api.worldsecuresystems.com
Connection: keep-alive
Content-Type: application/json
Authorization: 42ab136d77ce4e57a931db9e3299c2c82db5b406ad034bcb924e73fe894fcfb1
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `404` - when site ID is missing (from path)
* `401` - unauthorized
	* when site ID is invalid (non-existent) or it's the ID of a site from different DC (than the one referenced in the request URI)
	* when token is invalid (non-existent), missing or referencing a different site (from any DC)
