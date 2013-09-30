## Delete Web App

Delete the specified web app.

### Request

* **Method:** DELETE
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps/[NAME]
	* Alternatively use siteID instead of 'current'
* **Auth Header:** Site token required
* **Required Permissions:** Webapp Delete

#### Parameters

Use the name of the webapp as part of the URL (see **Path**)

### Response

A `204 No Content` is returned if deletion is successful.

### Examples

The request body should not contain any data. The response will contain no data in case of success.

**Request:**
~~~
DELETE /api/v2/admin/sites/-2/webapps/testcustomfields HTTPS/1.1
Authorization: 14f87f21c5ea4830a06a6314a8aad82b45bc61dc08f24a0fb55599cea83ca811
Connection: keep-alive
~~~

**Response:**
~~~
HTTP/1.1 204 No Content
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/APIs/javascript-SDK.html)

~~~
var app = new BCAPI.Models.WebApp.App({name: "Test app"});
app.destroy({
    success: function(webAppItem, response) {
        // handle success here.
 },
 error: function(webAppItem, xhr, options) {
        // handle error scenario.
 }
});
~~~

### Error Codes

This method will return the following error codes:

* `204` - No content, on success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the proper permissions
* `404` - if trying to access a webapp that does not exist
    * `190001` - sub-error code
