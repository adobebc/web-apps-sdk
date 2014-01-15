## Get Web App Country Codes

Get the list of the countries where the current webapp is allowed.

**Note:** This operation does not support: pagination, filtering, or sorting parameters.  

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/current/webapps/{webappname}/countries
  * Alternatively, use siteID instead of 'current'
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** View Web Apps

### Response

Returns an array of strings. Each string contains two letters that correspond to the name of the country.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/current/webapps/{webappname}/countries HTTPS/1.1
Authorization: 14f87f21c5ea4830a06a6314a8aad82b45bc61dc08f24a0fb55599cea83ca811
Connection: keep-alive
Content-Type: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip
Vary: Accept-Encoding
Server: Microsoft-IIS/7.5
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Authorization, Accept-Language, Content-Type
Access-Control-Allow-Methods: GET, HEAD, POST, PUT, DELETE
Access-Control-Expose-Headers: Location
Access-Control-Max-Age: 99999
Content-Length: length
 
{
  -"links": [2]
    -0: {
       "rel":"self",
       "uri":"https://mysite.worldsecuresystems.com/api/v2/admin/sites/current/webapps/Helpers/countries?skip=0&limit=10"
     }
    -1: {
       "rel":"countries",
       "uri":"https://mysite.worldsecuresystems.com/api/v2/admin/system/countries"
     },
  -"items":[
    "RO",
    "US",
    "UK"
  ],
  "totalItemsCount":3,
  "skip":0,
  "limit":10
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `10100` - (not authenticated) sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the web app view permission
* `404` - not found
  * `190001` - The web app could not be found (the webAppName param from the URL does not match)
