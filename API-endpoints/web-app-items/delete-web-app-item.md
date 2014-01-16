## Delete Web App Item

Delete a web app item.

### Request

* **Method:** DELETE
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webAppName]/items/[webAppItemId]
  * Alternatively, use "current" instead of {siteId}
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Delete Web App Items

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
Delete /api/v2/admin/sites/current/webapps/TestWebapp1/items/123
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
