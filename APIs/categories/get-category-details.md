## Get Category Details

Get the details for a given category. 

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteID]/categories/[categoryID]
	* Alternatively use "current" in place of siteId for current login token's site
* **Auth Header:** Site token required
* **Required Permissions:** View Category (3100)

### Response

A category object with the following properties:

* `links` - a collection of links *(array)*
	* `self` - the API URL that will return full details for this category *(string)*
	* `parent` - the API URL for the parent category *(string)*
* `id` - the ID of the category for the current site *(integer)*
* `name` - the name of the category *(string)*
* `parent` - the ID of the parent category, if this is a sub-category *(integer, nullable)*
* `publicAccess` - whether or not the category is visible to front-end users *(boolean)*
* `fullPath` - the full hierarchy for the current category *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET https://mysite.worldsecuresystems.com/api/v2/admin/sites/12345/categories/54321
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: {length}
 
{
 "links": [
        {
          "rel": "self",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/12345/categories/54321"
        },
        {
          "rel": "parent",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/12345/categories/54269"
        }],
      "id"      : "54269",
      "name"    : "somecategory",
      "parent"  : "123339",
      "publicAccess" : true,
      "fullPath" : "\parent\otherparent\somecategory"
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
	* `220000` - unknown error
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden - this is returned when the user trying to access the API does not have the proper permissions
* `404` - not found - this is returned when the given category does not exist
