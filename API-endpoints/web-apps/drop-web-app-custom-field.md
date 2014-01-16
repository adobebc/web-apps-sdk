## Drop Web App Custom Field

Delete a custom field.

### Request

* **Method:** DELETE
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/current/webapps/[webappName]/fields/[fieldId]
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Edit Web Apps

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
DELETE /api/v2/admin/sites/current/webapps/Cars/fields/418191 HTTPS/1.1
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request; sub-error codes:
  * `210000` - An unspecified error has occurred
* `401` - unauthorized - when the authentication token is incorrect
* `403` - forbidden - when the user does not have Edit WebApp Permission
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `210001` - The custom field was not found (the fieldId from the URL do not match)


