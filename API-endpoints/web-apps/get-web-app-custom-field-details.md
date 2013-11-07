## Get Web App Custom Field Details

Returns a field definition.

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/current/webapps/[webappName]/fields/[fieldId]
* **Auth Header:** Site token required
* **Required Permissions:** View Web Apps

### Response

An object, similar to the ones in the List API.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/12345/webapps/Cars/fields/418191 HTTPS/1.1
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 145
 
{
      "id"      : "418191",
      "name"    : "Part code",
      "type"    : "String",
      "listItems": null,
      "dataSource": null,
      "required": false,
      "order"   : 1
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request; sub-error codes:
  * `210000` - An unspecified error has occurred
* `401` - unauthorized - when the authentication token is incorrect
	* `101000` - sub-error code
* `403` - forbidden - when the user does not have View WebApps Permission
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `210001` - The custom field was not found (the fieldId from the URL do not match)
