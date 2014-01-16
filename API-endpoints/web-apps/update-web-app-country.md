## Update Web App country

Update the list of countries in which the Web App is available.

**Note:** This operation will overwrite the existing list of countries.

### Request

* **Method:** PUT
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/current/webapps/[webappname]/countries
   * Alternatively, use siteID instead of 'current'
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
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
PUT /api/v2/admin/sites/current/webapps/{webappname}/countries HTTPS/1.1
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
