## Site Login with Generic Token

Performs a site login. The token validity cannot be set (it is Short by default)

### Request

* **Method:** POST
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteid[/tokens
	* Alternatively, use 'current' instead of siteId
* **Auth Header:** generic token required

### Response

An authToken object with the following properties:

* `token` - Generic authentication token *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
POST /api/v2/admin/sites/{siteid}/tokens HTTPS/1.1
Content-Length: 57
Connection: keep-alive
Content-Type: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: length
 
{"token":"42ab136d77ce4e57a931db9e3299c2c82db5b406ad034bcb924e73fe894fcfb1"}
~~~

### Error Codes

This method will return the following error codes:

* `200` - Success
* `404` - not found - when site ID is empty (in the path)
* `401` - unauthorized
	* when site ID is invalid (non-existent) or it's the ID of a site from different DC (than the one referenced in the request URI)
	* when token is invalid (non-existent), missing or referencing a different site (from any DC)
	* `103018` sub-error code - Site is expired.
* `403` - forbidden
	* `107003` sub-error code - TOU not signed
	* links to tous that need to be signed
		* rel: partnerTou
		* uri: https://api.worldsecuresystems.com/api/v2/admin/tou/partner
