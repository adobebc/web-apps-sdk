## Logout for generic token

Performs a logout for a generic token

### Request

* **Method:** DELETE
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/tokens
* **Auth Header:** generic token required

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
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when token is invalid (non-existent), missing or is referencing a site from a different DC (than the one referenced in the request URI)
