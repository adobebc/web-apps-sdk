## Get template list

Get the list of templates for the current site.


**Notes:** This operation does not support: pagination, filtering, or sorting parameters. This operation hard-limits to the first 500 templates. 

There are 2 entries in the list that correspond to hardcoded values: 

* `Id` - -1: Don't use a template
* `Id` - 0: Use the default template

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/current/templates
  * Alternatively, use use siteID instead of 'current'
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** View Template

### Response

An array of the first 500 templates; each object has the following properties:

* `id` - the id of the template in the current site *(integer)*
* `name` - the name of the template *(string)*
* `siteId` - the id of the site *(integer)*
* `displayFileName` - the  name of the file on the filesystem *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/-2/templates HTTPS/1.1
Authorization: 14f87f21c5ea4830a06a6314a8aad82b45bc61dc08f24a0fb55599cea83ca811
Connection: keep-alive
Content-Type: application/json
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip
Content-Length: length
{
  "links": [
    {
       "rel":"self",
       "uri":"http:\/\/myapi.worldsecuresystems.com\/api\/v2\/admin\/templates"
    },
    {
       "rel":"previous",
       "uri":null
    },
    {
       "rel":"next",
       "uri":null
    }
  ],
  "items": [ 
    {
       "id":-1,
       "siteId":38587,
       "name":"Don't use a template",
       "displayFileName":"Don't use a template"
    },
    {
       "id":0,
       "siteId":38587,
       "name":"Use default template",
       "displayFileName":"Use default template"
    },
    {
       "id":555110,
       "siteId":38587,
       "name":"a'b",
       "displayFileName":"a&quot;b.htm"
    },
    {
       "id":555101,
       "siteId":38587,
       "name":"tehTemplate",
       "displayFileName":"tehTemplate.htm"
    }
  ],
  "totalItemsCount":4,
  "itemsPerPageCount":100,
  "currentPage":1
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the proper permissions
