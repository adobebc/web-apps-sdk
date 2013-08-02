## Update Web App country

Update the list of countries in which the Web App is available.

**Note:** This operation will overwrite the existing list of countries.

### Request

* **Method:** PUT
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/$siteId/webapps/$webappname/countries
* **Auth Header:** login token required
* **Required Permissions:** Edit Web Apps

#### Parameters ####

An array of strings. Each string is a two letter country code.

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT /api/v2/admin/sites/$siteId/webapps/$webappname/countries HTTPS/1.1
Content-Length: 50
Connection: keep-alive
Content-Type: application/json
 
["RO", "US", "UK"]
~~~

**Response:**

~~~
HTTP/1.1 200 OK
~~~

### Error Codes

This method will return the following error codes:

* `200` - success, country codes for the web app were successfully set
* `400` - bad request
  * `230001` - Country code is invalid
* `401` - unauthorized - when the authentication token is invalid / missing
	* `10100` - (not authenticated) sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the web app edit permission
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
